import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: number): Promise<{
        id: number;
        name: string | null;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        provider: string | null;
        receiveWeeklyEmail: boolean;
        receiveRecommendations: boolean;
    }>;
    updateProfile(userId: number, updateDto: UpdateProfileDto): Promise<{
        id: number;
        name: string | null;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        receiveWeeklyEmail: boolean;
        receiveRecommendations: boolean;
    }>;
    changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
