import { PrismaService } from '../../prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
export declare class ArticlesService {
    private prisma;
    constructor(prisma: PrismaService);
    private slugify;
    create(createArticleDto: CreateArticleDto, authorId: number): Promise<{
        id: number;
        title: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        categoryId: number;
        views: number;
        authorId: number;
    }>;
    findAll(query: {
        page?: number;
        limit?: number;
        categoryId?: number;
        search?: string;
    }): Promise<{
        data: ({
            category: {
                title: string;
                slug: string;
            };
            author: {
                name: string | null;
                avatar: string | null;
            };
        } & {
            id: number;
            title: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            excerpt: string | null;
            content: string;
            image: string | null;
            published: boolean;
            categoryId: number;
            views: number;
            authorId: number;
        })[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(slug: string): Promise<{
        category: {
            title: string;
            slug: string;
        };
        author: {
            name: string | null;
            avatar: string | null;
        };
    } & {
        id: number;
        title: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        categoryId: number;
        views: number;
        authorId: number;
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
                name: string | null;
                email: string;
            };
        } & {
            id: number;
            title: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            excerpt: string | null;
            content: string;
            image: string | null;
            published: boolean;
            categoryId: number;
            views: number;
            authorId: number;
        })[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    publish(id: number): Promise<{
        id: number;
        title: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        categoryId: number;
        views: number;
        authorId: number;
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
            title: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            excerpt: string | null;
            content: string;
            image: string | null;
            published: boolean;
            categoryId: number;
            views: number;
            authorId: number;
        })[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<{
        id: number;
        title: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        categoryId: number;
        views: number;
        authorId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string | null;
        content: string;
        image: string | null;
        published: boolean;
        categoryId: number;
        views: number;
        authorId: number;
    }>;
}
