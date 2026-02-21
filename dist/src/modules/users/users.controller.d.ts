import { UsersService } from './users.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        id: number;
        name: string | null;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        provider: string | null;
        receiveWeeklyEmail: boolean;
        receiveRecommendations: boolean;
    }>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<{
        id: number;
        name: string | null;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        receiveWeeklyEmail: boolean;
        receiveRecommendations: boolean;
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
