import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }

  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD') // Normalize to decompose characters (e.g., "á" -> "a" + "´")
      .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Remove duplicate -
      .replace(/^-+|-+$/g, ''); // Trim - from ends
  }

  async create(createArticleDto: CreateArticleDto, authorId: number) {
    try {
      const slug = createArticleDto.slug || this.slugify(createArticleDto.title);

      // Ensure slug is unique by appending timestamp if needed (simple approach)
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
    } catch (error) {
      console.error('Prisma Create Article Error:', error);
      throw error;
    }
  }

  async findAll(query: { page?: number; limit?: number; categoryId?: number; search?: string }) {
    const { page = 1, limit = 10, categoryId, search } = query;
    const skip = (page - 1) * limit;

    const where: any = { published: true };
    if (categoryId) where.categoryId = categoryId;
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

  async findOne(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, avatar: true } },
        category: { select: { title: true, slug: true } },
      },
    });

    if (!article) throw new NotFoundException(`Article with slug ${slug} not found`);

    // Increment views
    await this.prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    });

    return article;
  }

  async findAllForAdmin(query: { page?: number; limit?: number; status?: 'all' | 'pending' | 'published' }) {
    const { page = 1, limit = 10, status = 'all' } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status === 'pending') where.published = false;
    if (status === 'published') where.published = true;

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

  async publish(id: number) {
    return this.prisma.article.update({
      where: { id },
      data: { published: true },
    });
  }

  async findAllForUser(userId: number, query: { page?: number; limit?: number }) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        where: { authorId: userId },
        skip,
        take: limit,
        include: {
          category: { select: { title: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.article.count({ where: { authorId: userId } }),
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

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number) {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}
