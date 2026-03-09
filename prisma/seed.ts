import { PrismaClient, UserRole, AccountStatus, ProductCategory, ProductUnit, ConnectionStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding with Baltimore/DMV content...');

    // 1. Clean existing data
    await prisma.orderMessage.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.connection.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.product.deleteMany();
    await prisma.farmer.deleteMany();
    await prisma.grocer.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.user.deleteMany();

    const hashedDefaultPassword = await hash('password123', 12);

    // ============================================
    // FARMERS (VENDORS)
    // ============================================

    // Agriberry Farms
    const farmer1User = await prisma.user.create({
        data: {
            email: 'sales@agriberry.com',
            name: 'Anne Geyer',
            password: hashedDefaultPassword,
            role: UserRole.FARMER,
            status: AccountStatus.ACTIVE,
            farmer: {
                create: {
                    farmName: 'Agriberry Farms',
                    description: 'A premium fruit-forward farm known for berries, seasonal produce, and dependable delivery cadence.',
                    address: 'Hanover, VA',
                    city: 'Richmond',
                    state: 'VA',
                    zipCode: '23069',
                    certifications: ['GAP Certified'],
                    rating: 4.9,
                    isVerified: true,
                    phone: '(804) 555-0143',
                    deliveryDays: ['Tuesday', 'Friday'],
                    leadTimeDays: 2,
                    minimumOrderAmount: 150,
                    story: 'Built for neighborhood stores that want local fruit supply without the back-and-forth of spreadsheets and texts.',
                }
            }
        }
    });

    // Fullbright Farm
    const farmer2User = await prisma.user.create({
        data: {
            email: 'hello@fullbright.farm',
            name: 'Michael Fullbright',
            password: hashedDefaultPassword,
            role: UserRole.FARMER,
            status: AccountStatus.ACTIVE,
            farmer: {
                create: {
                    farmName: 'Fullbright Farm',
                    description: 'Mixed produce and egg supplier serving Baltimore and nearby counties with consistent harvest windows.',
                    address: 'Parkton, MD',
                    city: 'Baltimore',
                    state: 'MD',
                    zipCode: '21120',
                    certifications: ['Organic'],
                    rating: 4.7,
                    isVerified: true,
                    phone: '(410) 555-0194',
                    deliveryDays: ['Wednesday', 'Saturday'],
                    leadTimeDays: 2,
                    minimumOrderAmount: 120,
                }
            }
        }
    });

    // Baby Beans
    const farmer3User = await prisma.user.create({
        data: {
            email: 'contact@babybeans.com',
            name: 'Leo Chen',
            password: hashedDefaultPassword,
            role: UserRole.FARMER,
            status: AccountStatus.ACTIVE,
            farmer: {
                create: {
                    farmName: 'Baby Beans',
                    description: 'A compact specialty grower focused on herbs, tender greens, and restaurant-grade freshness.',
                    address: 'Baltimore, MD',
                    city: 'Baltimore',
                    state: 'MD',
                    zipCode: '21211',
                    certifications: ['Hydroponic', 'Pesticide-Free'],
                    rating: 4.8,
                    isVerified: true,
                    phone: '(443) 555-0130',
                    deliveryDays: ['Monday', 'Thursday'],
                    leadTimeDays: 1,
                    minimumOrderAmount: 80,
                }
            }
        }
    });

    const farmer1 = await prisma.farmer.findUnique({ where: { userId: farmer1User.id } });
    const farmer2 = await prisma.farmer.findUnique({ where: { userId: farmer2User.id } });
    const farmer3 = await prisma.farmer.findUnique({ where: { userId: farmer3User.id } });

    // ============================================
    // GROCERS (BUYERS)
    // ============================================

    // Eddie's of Mount Vernon
    const grocer1User = await prisma.user.create({
        data: {
            email: 'buyer@eddiesmv.com',
            name: 'Dennis Zorn',
            password: hashedDefaultPassword,
            role: UserRole.GROCER,
            status: AccountStatus.ACTIVE,
            grocer: {
                create: {
                    businessName: "Eddie's of Mount Vernon",
                    businessType: 'Supermarket',
                    description: 'A neighborhood grocer in the heart of Baltimore with a strong premium-local fit.',
                    address: '813 N Charles St',
                    city: 'Baltimore',
                    state: 'MD',
                    zipCode: '21201',
                    isVerified: true,
                    phone: '(410) 555-0150',
                    receivingAddress: '813 N Charles St, Baltimore, MD 21201',
                    receivingDays: ['Tuesday', 'Wednesday', 'Friday'],
                    preferredDeliveryDays: ['Tuesday', 'Friday'],
                    categoriesOfInterest: ['Fruits', 'Vegetables', 'Herbs', 'Dairy', 'Eggs'],
                }
            }
        }
    });

    // Eddie's of Roland Park
    const grocer2User = await prisma.user.create({
        data: {
            email: 'orders@eddiesrolandpark.com',
            name: 'Nancy Cohen',
            password: hashedDefaultPassword,
            role: UserRole.GROCER,
            status: AccountStatus.ACTIVE,
            grocer: {
                create: {
                    businessName: "Eddie's of Roland Park",
                    businessType: 'Supermarket',
                    description: 'Independent grocery with a premium neighborhood footprint and reliable receiving schedule.',
                    address: '5113 Roland Ave',
                    city: 'Baltimore',
                    state: 'MD',
                    zipCode: '21210',
                    isVerified: true,
                    phone: '(410) 555-0151',
                    receivingAddress: '5113 Roland Ave, Baltimore, MD 21210',
                    receivingDays: ['Monday', 'Wednesday', 'Friday'],
                    preferredDeliveryDays: ['Wednesday', 'Friday'],
                    categoriesOfInterest: ['Fruits', 'Vegetables', 'Eggs'],
                }
            }
        }
    });

    const grocer1 = await prisma.grocer.findUnique({ where: { userId: grocer1User.id } });
    const grocer2 = await prisma.grocer.findUnique({ where: { userId: grocer2User.id } });

    // ============================================
    // PRODUCTS
    // ============================================

    if (farmer1 && farmer2 && farmer3) {
        // Agriberry Products
        await prisma.product.createMany({
            data: [
                {
                    farmerId: farmer1.id,
                    name: 'Strawberries',
                    description: 'Field-ripened local strawberries.',
                    category: ProductCategory.FRUITS,
                    unit: ProductUnit.CASE,
                    packSize: '8 x 1 qt',
                    pricePerUnit: 42.0,
                    availableQty: 50,
                    isOrganic: false,
                    images: ['/images/hero/Hero-1.jpg'],
                },
                {
                    farmerId: farmer1.id,
                    name: 'Blueberries',
                    description: 'Sweet seasonal blueberries.',
                    category: ProductCategory.FRUITS,
                    unit: ProductUnit.CASE,
                    packSize: '12 pints',
                    pricePerUnit: 48.0,
                    availableQty: 30,
                    isOrganic: false,
                    images: ['/images/hero/Hero-5.jpg'],
                },
                {
                    farmerId: farmer1.id,
                    name: 'Baby Kale',
                    description: 'Tender baby kale mix.',
                    category: ProductCategory.VEGETABLES,
                    unit: ProductUnit.CASE,
                    packSize: '6 lbs',
                    pricePerUnit: 28.0,
                    availableQty: 25,
                    isOrganic: true,
                    images: ['/images/hero/Hero-1.jpg'],
                },
            ],
        });

        // Baby Beans Products
        await prisma.product.createMany({
            data: [
                {
                    farmerId: farmer3.id,
                    name: 'Fresh Basil',
                    description: 'Hydroponic sweet basil.',
                    category: ProductCategory.HERBS,
                    unit: ProductUnit.BUNCH,
                    packSize: '24 bunches',
                    pricePerUnit: 16.0,
                    availableQty: 40,
                    isOrganic: true,
                    images: ['/images/hero/Hero-1.jpg'],
                },
                {
                    farmerId: farmer3.id,
                    name: 'Arugula',
                    description: 'Peppery baby arugula.',
                    category: ProductCategory.VEGETABLES,
                    unit: ProductUnit.CASE,
                    packSize: '4 lbs',
                    pricePerUnit: 24.0,
                    availableQty: 20,
                    isOrganic: true,
                    images: ['/images/hero/Hero-5.jpg'],
                },
            ],
        });

        // Fullbright Products
        await prisma.product.createMany({
            data: [
                {
                    farmerId: farmer2.id,
                    name: 'Rainbow Carrots',
                    description: 'Colorful bunch of carrots.',
                    category: ProductCategory.VEGETABLES,
                    unit: ProductUnit.CASE,
                    packSize: '10 lbs',
                    pricePerUnit: 18.0,
                    availableQty: 35,
                    isOrganic: true,
                    images: ['/images/hero/Hero-1.jpg'],
                },
                {
                    farmerId: farmer2.id,
                    name: 'Farm Fresh Eggs',
                    description: 'Pasture-raised brown eggs.',
                    category: ProductCategory.EGGS,
                    unit: ProductUnit.DOZEN,
                    packSize: '12 ct',
                    pricePerUnit: 6.5,
                    availableQty: 100,
                    isOrganic: true,
                    images: ['/images/hero/Hero-5.jpg'],
                },
            ],
        });
    }

    // ============================================
    // CONNECTIONS
    // ============================================

    if (farmer1 && farmer2 && farmer3 && grocer1 && grocer2) {
        await prisma.connection.createMany({
            data: [
                {
                    farmerId: farmer1.id,
                    grocerId: grocer1.id,
                    status: ConnectionStatus.APPROVED,
                    approvedAt: new Date(),
                },
                {
                    farmerId: farmer2.id,
                    grocerId: grocer1.id,
                    status: ConnectionStatus.APPROVED,
                    approvedAt: new Date(),
                },
                {
                    farmerId: farmer3.id,
                    grocerId: grocer2.id,
                    status: ConnectionStatus.PENDING,
                },
            ],
        });
    }

    // ============================================
    // ADMIN USER
    // ============================================

    await prisma.user.create({
        data: {
            email: 'admin@farmtogrocer.com',
            name: 'Platform Admin',
            password: hashedDefaultPassword,
            role: UserRole.ADMIN,
            status: AccountStatus.ACTIVE,
        }
    });

    console.log('✅ Seeding completed! Use password "password123" for all demo users.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
