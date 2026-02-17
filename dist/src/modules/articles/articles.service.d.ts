import { PrismaService } from '../../prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
export declare class ArticlesService {
    private prisma;
    constructor(prisma: PrismaService);
    private slugify;
    create(createArticleDto: CreateArticleDto, authorId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        views: number;
        authorId: number;
        categoryId: number;
    }>;
    findAll(query: {
        page?: number;
        limit?: number;
        categoryId?: number;
        search?: string;
    }): Promise<{
        data: ({
            category: {
                slug: string;
                title: string;
            };
            author: {
                name: string | null;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            title: string;
            excerpt: string | null;
            content: string;
            image: string | null;
            published: boolean;
            views: number;
            authorId: number;
            categoryId: number;
        })[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(slug: string): Promise<{
        category: {
            slug: string;
            title: string;
        };
        author: {
            name: string | null;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        views: number;
        authorId: number;
        categoryId: number;
    }>;
    findAllForAdmin(query: {
        page?: number;
        limit?: number;
        status?: 'all' | 'pending' | 'published';
    }): Promise<{
        data: ({
            category: {
                title: string;
            };
            author: {
                email: string;
                name: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            title: string;
            excerpt: string | null;
            content: string;
            image: string | null;
            published: boolean;
            views: number;
            authorId: number;
            categoryId: number;
        })[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    publish(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        views: number;
        authorId: number;
        categoryId: number;
    }>;
    findAllForUser(userId: number, query: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: ({
            category: {
                title: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            title: string;
            excerpt: string | null;
            content: string;
            image: string | null;
            published: boolean;
            views: number;
            authorId: number;
            categoryId: number;
        })[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        views: number;
        authorId: number;
        categoryId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        views: number;
        authorId: number;
        categoryId: number;
    }>;
}
