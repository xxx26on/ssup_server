import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto, req: any): Promise<{
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
    findAll(page?: string, limit?: string, categoryId?: string, search?: string): Promise<{
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
    findAllMyArticles(req: any, page?: string, limit?: string): Promise<{
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
    findAllAdmin(page?: string, limit?: string, status?: 'all' | 'pending' | 'published'): Promise<{
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
