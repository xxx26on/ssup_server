import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { SocialUserDto } from './dto/social-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER',
      },
    });

    return {
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar },
    };
  }
  async validateSocialUser(socialUser: SocialUserDto) {
    const { email, name, avatar, provider, socialId } = socialUser;

    if (!email) {
      throw new Error('Email not found from social provider');
    }

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      if (!user.provider || user.provider === 'local') {
        const updateData: any = {};
        if (avatar && !user.avatar) updateData.avatar = avatar;
        if (provider) updateData.provider = provider;
        if (socialId) updateData.socialId = socialId;

        if (Object.keys(updateData).length > 0) {
          user = await this.prisma.user.update({
            where: { id: user.id },
            data: updateData
          });
        }
      }
    } else {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          avatar,
          provider,
          socialId,
          password: "", // Social users don't have a password
          role: 'USER',
        },
      });
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }
}
