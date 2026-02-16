"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ArticlesService = class ArticlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd')
            .replace(/([^0-9a-z-\s])/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    async create(createArticleDto, authorId) {
        try {
            const slug = createArticleDto.slug || this.slugify(createArticleDto.title);
            const existing = await this.prisma.article.findUnique({ where: { slug } });
            const finalSlug = existing ? `${slug}-${Date.now()}` : slug;
            console.log('Creating article with data:', {
                ...createArticleDto,
                slug: finalSlug,
                authorId,
            });
            return await this.prisma.article.create({
                data: {
                    ...createArticleDto,
                    slug: finalSlug,
                    authorId,
                },
            });
        }
        catch (error) {
            console.error('Prisma Create Article Error:', error);
            throw error;
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, categoryId, search } = query;
        const skip = (page - 1) * limit;
        const where = { published: true };
        if (categoryId)
            where.categoryId = categoryId;
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { excerpt: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [articles, total] = await Promise.all([
            this.prisma.article.findMany({
                where,
                skip,
                take: limit,
                include: {
                    author: { select: { name: true, avatar: true } },
                    category: { select: { title: true, slug: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.article.count({ where }),
        ]);
        return {
            data: articles,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }
    async findOne(slug) {
        const article = await this.prisma.article.findUnique({
            where: { slug },
            include: {
                author: { select: { name: true, avatar: true } },
                category: { select: { title: true, slug: true } },
            },
        });
        if (!article)
            throw new common_1.NotFoundException(`Article with slug ${slug} not found`);
        await this.prisma.article.update({
            where: { id: article.id },
            data: { views: { increment: 1 } },
        });
        return article;
    }
    async findAllForAdmin(query) {
        const { page = 1, limit = 10, status = 'all' } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (status === 'pending')
            where.published = false;
        if (status === 'published')
            where.published = true;
        const [articles, total] = await Promise.all([
            this.prisma.article.findMany({
                where,
                skip,
                take: limit,
                include: {
                    author: { select: { name: true, email: true } },
                    category: { select: { title: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.article.count({ where }),
        ]);
        return {
            data: articles,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }
    async publish(id) {
        return this.prisma.article.update({
            where: { id },
            data: { published: true },
        });
    }
    async update(id, updateArticleDto) {
        return this.prisma.article.update({
            where: { id },
            data: updateArticleDto,
        });
    }
    async remove(id) {
        return this.prisma.article.delete({
            where: { id },
        });
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map