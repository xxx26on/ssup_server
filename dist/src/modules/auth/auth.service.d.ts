import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { SocialUserDto } from './dto/social-user.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            name: string | null;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
        };
    }>;
    validateSocialUser(socialUser: SocialUserDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
        };
    }>;
}
