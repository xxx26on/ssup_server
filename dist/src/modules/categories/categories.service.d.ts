import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        description: string | null;
        parentId: number | null;
    }>;
    findAll(): Promise<({
        parent: {
            title: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        description: string | null;
        parentId: number | null;
    })[]>;
    findOne(id: number): Promise<{
        articles: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            title: string;
            excerpt: string | null;
            content: string;
            image: string | null;
            published: boolean;
            categoryId: number;
            views: number;
            authorId: number;
        }[];
        children: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            title: string;
            description: string | null;
            parentId: number | null;
        }[];
        parent: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            title: string;
            description: string | null;
            parentId: number | null;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        description: string | null;
        parentId: number | null;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        description: string | null;
        parentId: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        description: string | null;
        parentId: number | null;
    }>;
}
