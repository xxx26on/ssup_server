import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        title: string;
        slug: string;
        description: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        parent: {
            title: string;
        } | null;
    } & {
        id: number;
        title: string;
        slug: string;
        description: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        articles: {
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
        }[];
        parent: {
            id: number;
            title: string;
            slug: string;
            description: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        children: {
            id: number;
            title: string;
            slug: string;
            description: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        title: string;
        slug: string;
        description: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        title: string;
        slug: string;
        description: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        slug: string;
        description: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
