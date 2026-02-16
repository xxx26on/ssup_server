import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto, req: any): Promise<{
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
    findAll(page?: string, limit?: string, categoryId?: string, search?: string): Promise<{
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
    findAllAdmin(page?: string, limit?: string, status?: 'all' | 'pending' | 'published'): Promise<{
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
