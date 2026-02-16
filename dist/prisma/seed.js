"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const adminEmail = 'admin@ssvn.com';
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: hashedPassword,
            name: 'SSVN Admin',
            role: 'ADMIN',
        },
    });
    console.log('Seed Admin User:', admin.email);
    const categories = [
        {
            title: 'Công nghệ',
            slug: 'cong-nghe',
            description: 'Tin tức và xu hướng công nghệ mới nhất.',
            children: {
                create: [
                    { title: 'AI', slug: 'ai', description: 'Trí tuệ nhân tạo và Machine Learning.' },
                    { title: 'Blockchain', slug: 'blockchain', description: 'Công nghệ chuỗi khối và tiền mã hóa.' },
                    { title: 'Gadgets', slug: 'gadgets', description: 'Các thiết bị điện tử thông minh.' },
                ],
            },
        },
        {
            title: 'Khởi nghiệp',
            slug: 'khoi-nghiep',
            description: 'Câu chuyện và kinh nghiệm từ các startup Việt.',
            children: {
                create: [
                    { title: 'Kinh doanh', slug: 'kinh-doanh', description: 'Kỹ năng và chiến lược kinh doanh.' },
                    { title: 'Đầu tư', slug: 'dau-tu', description: 'Tin tức gọi vốn và đầu tư mạo hiểm.' },
                ],
            },
        },
        {
            title: 'Phong cách sống',
            slug: 'lifestyle',
            description: 'Cảm hứng sống và làm việc hiện đại.',
        },
    ];
    console.log('Start seeding categories...');
    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map