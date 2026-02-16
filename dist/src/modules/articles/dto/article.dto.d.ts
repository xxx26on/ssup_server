export declare class CreateArticleDto {
    title: string;
    slug?: string;
    excerpt?: string;
    content: string;
    image?: string;
    published?: boolean;
    categoryId: number;
}
export declare class UpdateArticleDto {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    image?: string;
    published?: boolean;
    categoryId?: number;
}
