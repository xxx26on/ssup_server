import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // --- Seed Admin User ---
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

  // --- Seed Categories ---
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
