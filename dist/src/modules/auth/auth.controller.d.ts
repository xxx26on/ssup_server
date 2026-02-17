import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    facebookAuth(req: any): Promise<void>;
    facebookAuthRedirect(req: any, res: Response): Promise<void>;
}
