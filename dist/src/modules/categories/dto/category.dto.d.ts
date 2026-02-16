export declare class CreateCategoryDto {
    title: string;
    slug: string;
    description?: string;
    parentId?: number;
}
export declare class UpdateCategoryDto {
    title?: string;
    slug?: string;
    description?: string;
    parentId?: number;
}
