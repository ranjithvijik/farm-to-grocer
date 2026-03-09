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

    // Heritage Meats
    const farmer4User = await prisma.user.create({
        data: {
            email: 'sales@heritagemeats.com',
            name: 'Sarah Jenkins',
            password: hashedDefaultPassword,
            role: UserRole.FARMER,
            status: AccountStatus.ACTIVE,
            farmer: {
                create: {
                    farmName: 'Heritage Meats',
                    description: 'Pasture-raised heritage breeds of pork, beef, and poultry. Dedicated to regenerative agriculture.',
                    address: 'Westminster, MD',
                    city: 'Westminster',
                    state: 'MD',
                    zipCode: '21157',
                    certifications: ['Animal Welfare Approved', 'Non-GMO'],
                    rating: 4.9,
                    isVerified: true,
                    phone: '(410) 555-0210',
                    deliveryDays: ['Tuesday', 'Thursday'],
                    leadTimeDays: 3,
                    minimumOrderAmount: 200,
                }
            }
        }
    });

    // Chesapeake Grains & Dairy
    const farmer5User = await prisma.user.create({
        data: {
            email: 'orders@chesapeakegrains.com',
            name: 'David Miller',
            password: hashedDefaultPassword,
            role: UserRole.FARMER,
            status: AccountStatus.ACTIVE,
            farmer: {
                create: {
                    farmName: 'Chesapeake Grains & Dairy',
                    description: 'Stone-ground grains and small-batch dairy from the Eastern Shore.',
                    address: 'Easton, MD',
                    city: 'Easton',
                    state: 'MD',
                    zipCode: '21601',
                    certifications: ['Organic'],
                    rating: 4.7,
                    isVerified: true,
                    phone: '(410) 555-0222',
                    deliveryDays: ['Wednesday', 'Friday'],
                    leadTimeDays: 2,
                    minimumOrderAmount: 100,
                }
            }
        }
    });

    const farmer1 = await prisma.farmer.findUnique({ where: { userId: farmer1User.id } });
    const farmer2 = await prisma.farmer.findUnique({ where: { userId: farmer2User.id } });
    const farmer3 = await prisma.farmer.findUnique({ where: { userId: farmer3User.id } });
    const farmer4 = await prisma.farmer.findUnique({ where: { userId: farmer4User.id } });
    const farmer5 = await prisma.farmer.findUnique({ where: { userId: farmer5User.id } });

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
                    categoriesOfInterest: ['Fruits', 'Vegetables', 'Herbs', 'Dairy', 'Eggs', 'Meat', 'Grains'],
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
                    categoriesOfInterest: ['Fruits', 'Vegetables', 'Eggs', 'Dairy'],
                }
            }
        }
    });

    const grocer1 = await prisma.grocer.findUnique({ where: { userId: grocer1User.id } });
    const grocer2 = await prisma.grocer.findUnique({ where: { userId: grocer2User.id } });

    // ============================================
    // PRODUCTS
    // ============================================

    if (farmer1 && farmer2 && farmer3 && farmer4 && farmer5) {
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
                    images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80'],
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
                    images: ['https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&q=80'],
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
                    images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'],
                },
                {
                    farmerId: farmer1.id,
                    name: 'Wildflower Honey',
                    description: 'Raw, local wildflower honey from Hanover bees.',
                    category: ProductCategory.HONEY,
                    unit: ProductUnit.CASE,
                    packSize: '12 x 16oz jars',
                    pricePerUnit: 96.0,
                    availableQty: 15,
                    isOrganic: false,
                    images: ['https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80'],
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
                    images: ['https://images.unsplash.com/photo-1618376168163-05efea971164?w=800&q=80'],
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
                    images: ['https://images.unsplash.com/photo-1546552723-ba178a99370f?w=800&q=80'],
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
                    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80'],
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
                    images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80'],
                },
                {
                    farmerId: farmer2.id,
                    name: 'Heirloom Tomatoes',
                    description: 'Assorted heirloom tomato varieties.',
                    category: ProductCategory.VEGETABLES,
                    unit: ProductUnit.CASE,
                    packSize: '15 lbs',
                    pricePerUnit: 45.0,
                    availableQty: 40,
                    isOrganic: true,
                    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80'],
                },
                {
                    farmerId: farmer2.id,
                    name: 'Local Jam Assortment',
                    description: 'Artisanal jams made with farm-fresh fruit.',
                    category: ProductCategory.OTHER,
                    unit: ProductUnit.CASE,
                    packSize: '12 x 8oz jars',
                    pricePerUnit: 60.0,
                    availableQty: 20,
                    isOrganic: false,
                    images: ['https://images.unsplash.com/photo-1621262799307-8884964be0c4?w=800&q=80'],
                },
            ],
        });

        // Heritage Meats Products
        await prisma.product.createMany({
            data: [
                {
                    farmerId: farmer4.id,
                    name: 'Grass-Fed Ground Beef',
                    description: 'Regenerative pasture-raised 80/20 ground beef.',
                    category: ProductCategory.MEAT,
                    unit: ProductUnit.LB,
                    packSize: '10 x 1lb packs',
                    pricePerUnit: 8.5,
                    availableQty: 60,
                    isOrganic: false,
                    images: ['https://images.unsplash.com/photo-1551028150-64b9f398f678?w=800&q=80'],
                },
                {
                    farmerId: farmer4.id,
                    name: 'Whole Pasture Chicken',
                    description: 'Freedom Ranger breed chicken, average 4-5 lbs.',
                    category: ProductCategory.POULTRY,
                    unit: ProductUnit.PIECE,
                    packSize: '1 chicken',
                    pricePerUnit: 22.0,
                    availableQty: 30,
                    isOrganic: false,
                    images: ['https://images.unsplash.com/photo-1521562916104-e53b47f48b11?w=800&q=80'],
                },
                {
                    farmerId: farmer4.id,
                    name: 'Heritage Pork Chops',
                    description: 'Thick-cut, bone-in Berkshire pork chops.',
                    category: ProductCategory.MEAT,
                    unit: ProductUnit.LB,
                    packSize: '4 x 12oz chops',
                    pricePerUnit: 12.0,
                    availableQty: 25,
                    isOrganic: false,
                    images: ['https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80'],
                },
            ],
        });

        // Grains & Dairy Products
        await prisma.product.createMany({
            data: [
                {
                    farmerId: farmer5.id,
                    name: 'Whole Milk',
                    description: 'Non-homogenized cream-top milk in glass half-gallons.',
                    category: ProductCategory.DAIRY,
                    unit: ProductUnit.GALLON,
                    packSize: '1/2 gallon bottle',
                    pricePerUnit: 5.5,
                    availableQty: 50,
                    isOrganic: true,
                    images: ['https://images.unsplash.com/photo-1550583724-125581820ffb?w=800&q=80'],
                },
                {
                    farmerId: farmer5.id,
                    name: 'Artisan Bread Flour',
                    description: 'Stone-ground hard red winter wheat flour.',
                    category: ProductCategory.GRAINS,
                    unit: ProductUnit.LB,
                    packSize: '5 lb bag',
                    pricePerUnit: 7.5,
                    availableQty: 100,
                    isOrganic: true,
                    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80'],
                },
                {
                    farmerId: farmer5.id,
                    name: 'Salted Farmhouse Butter',
                    description: 'High-fat cultured butter with sea salt.',
                    category: ProductCategory.DAIRY,
                    unit: ProductUnit.LB,
                    packSize: '1 lb block',
                    pricePerUnit: 9.0,
                    availableQty: 40,
                    isOrganic: true,
                    images: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80'],
                },
                {
                    farmerId: farmer5.id,
                    name: 'Steel Cut Oats',
                    description: 'Locally grown and hulled steel cut oats.',
                    category: ProductCategory.GRAINS,
                    unit: ProductUnit.LB,
                    packSize: '2.5 lb bag',
                    pricePerUnit: 4.5,
                    availableQty: 80,
                    isOrganic: true,
                    images: ['https://images.unsplash.com/photo-1506484334406-f119ca483aa3?w=800&q=80'],
                },
            ],
        });
    }

    // ============================================
    // CONNECTIONS
    // ============================================

    if (farmer1 && farmer2 && farmer3 && farmer4 && farmer5 && grocer1 && grocer2) {
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
                    farmerId: farmer4.id,
                    grocerId: grocer1.id,
                    status: ConnectionStatus.APPROVED,
                    approvedAt: new Date(),
                },
                {
                    farmerId: farmer3.id,
                    grocerId: grocer2.id,
                    status: ConnectionStatus.PENDING,
                },
                {
                    farmerId: farmer5.id,
                    grocerId: grocer2.id,
                    status: ConnectionStatus.APPROVED,
                    approvedAt: new Date(),
                },
            ],
        });
    }

    // ============================================
    // CART ITEMS
    // ============================================

    // Give Grocer2 some items in their cart
    if (grocer2 && farmer1 && farmer3) {
        const agProduct = await prisma.product.findFirst({ where: { farmerId: farmer1.id, name: 'Strawberries' } });
        const babyProduct = await prisma.product.findFirst({ where: { farmerId: farmer3.id, name: 'Fresh Basil' } });

        if (agProduct && babyProduct) {
            await prisma.cartItem.createMany({
                data: [
                    { grocerId: grocer2.id, productId: agProduct.id, quantity: 2 },
                    { grocerId: grocer2.id, productId: babyProduct.id, quantity: 5 }
                ]
            });
        }
    }

    // ============================================
    // ORDERS & PAYMENTS
    // ============================================

    if (grocer1 && farmer2) {
        const fullbrightProduct = await prisma.product.findFirst({ where: { farmerId: farmer2.id, name: 'Farm Fresh Eggs' } });

        if (fullbrightProduct) {
            const order = await prisma.order.create({
                data: {
                    orderNumber: 'ORD-2026-0001',
                    farmerId: farmer2.id,
                    grocerId: grocer1.id,
                    status: 'CONFIRMED',
                    paymentStatus: 'PAID',
                    deliveryMethod: 'DELIVERY',
                    subtotal: 32.50, // 5 * 6.50
                    tax: 0,
                    deliveryFee: 15.00,
                    total: 47.50,
                    notes: 'Please leave at the loading dock.',
                    deliveryAddress: grocer1.receivingAddress || grocer1.address,
                    deliveryDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
                    items: {
                        create: [
                            {
                                productId: fullbrightProduct.id,
                                productName: fullbrightProduct.name,
                                quantity: 5,
                                pricePerUnit: fullbrightProduct.pricePerUnit,
                                total: 5 * fullbrightProduct.pricePerUnit
                            }
                        ]
                    },
                    payment: {
                        create: {
                            amount: 47.50,
                            method: 'stripe',
                            transactionId: 'pi_test_1234567890',
                            status: 'PAID',
                            paidAt: new Date(),
                        }
                    },
                    messages: {
                        create: [
                            {
                                senderId: farmer2.userId,
                                message: 'Thanks for the order! Will deliver on Friday morning.',
                            }
                        ]
                    }
                }
            });

            // Add notification for the order
            await prisma.notification.create({
                data: {
                    userId: grocer1.userId,
                    type: 'ORDER_CONFIRMED',
                    title: 'Order Confirmed',
                    message: `Your order ${order.orderNumber} has been confirmed by ${farmer2.farmName}.`,
                    link: `/grocer/orders`
                }
            });
            await prisma.notification.create({
                data: {
                    userId: farmer2.userId,
                    type: 'ORDER_PLACED',
                    title: 'New Order Received',
                    message: `You received a new order ${order.orderNumber} from ${grocer1.businessName}.`,
                    link: `/farmer/orders`
                }
            });
        }
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
