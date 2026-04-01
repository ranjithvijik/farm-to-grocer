import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Clean existing data (order matters for foreign keys)
    await prisma.activity.deleteMany();
    await prisma.message.deleteMany();
    await prisma.invoice.deleteMany();
    await prisma.promotion.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.orderMessage.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.savedFarmer.deleteMany();
    await prisma.connection.deleteMany();
    await prisma.product.deleteMany();
    await prisma.farmer.deleteMany();
    await prisma.grocer.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    const pw = await hash('password123', 12);

    // ============================================
    // USERS + PROFILES
    // ============================================

    // Admin
    const adminUser = await prisma.user.create({
        data: { email: 'admin@farmtogrocer.com', name: 'Platform Admin', password: pw, role: 'ADMIN', status: 'ACTIVE' }
    });

    // --- Farmer 1: Green Valley Organics ---
    const f1User = await prisma.user.create({
        data: {
            email: 'sales@agriberry.com', name: 'Anne Geyer', password: pw, role: 'FARMER', status: 'ACTIVE',
            farmer: {
                create: {
                    farmName: 'Green Valley Organics', description: 'Premium organic vegetables and herbs grown in the Shenandoah Valley.',
                    address: '4520 Valley Farm Rd', city: 'Harrisonburg', state: 'VA', zipCode: '22801',
                    certifications: JSON.stringify(['USDA Organic', 'GAP Certified']),
                    rating: 4.9, isVerified: true, totalSales: 342,
                    phone: '(540) 555-0143', deliveryDays: JSON.stringify(['Tuesday', 'Friday']),
                    leadTimeDays: 2, minimumOrderAmount: 150,
                    story: 'Third-generation family farm committed to regenerative organic practices since 1987.',
                }
            }
        }
    });

    // --- Farmer 2: Heritage Dairy Farm ---
    const f2User = await prisma.user.create({
        data: {
            email: 'hello@fullbright.farm', name: 'Michael Fullbright', password: pw, role: 'FARMER', status: 'ACTIVE',
            farmer: {
                create: {
                    farmName: 'Heritage Dairy Farm', description: 'Small-batch dairy and pasture-raised eggs from our family farm.',
                    address: '1200 Creamery Ln', city: 'Parkton', state: 'MD', zipCode: '21120',
                    certifications: JSON.stringify(['Organic', 'Animal Welfare Approved']),
                    rating: 4.7, isVerified: true, totalSales: 218,
                    phone: '(410) 555-0194', deliveryDays: JSON.stringify(['Wednesday', 'Saturday']),
                    leadTimeDays: 2, minimumOrderAmount: 120,
                }
            }
        }
    });

    // --- Farmer 3: Blue Ridge Meats ---
    const f3User = await prisma.user.create({
        data: {
            email: 'contact@babybeans.com', name: 'Leo Chen', password: pw, role: 'FARMER', status: 'ACTIVE',
            farmer: {
                create: {
                    farmName: 'Blue Ridge Meats', description: 'Pasture-raised heritage breed pork, beef, and poultry. Dedicated to regenerative agriculture.',
                    address: '780 Ridge Rd', city: 'Westminster', state: 'MD', zipCode: '21157',
                    certifications: JSON.stringify(['Non-GMO', 'Animal Welfare Approved']),
                    rating: 4.8, isVerified: true, totalSales: 156,
                    phone: '(443) 555-0130', deliveryDays: JSON.stringify(['Monday', 'Thursday']),
                    leadTimeDays: 3, minimumOrderAmount: 200,
                }
            }
        }
    });

    // --- Grocer 1: Fresh Market Co ---
    const g1User = await prisma.user.create({
        data: {
            email: 'buyer@eddiesmv.com', name: 'Dennis Zorn', password: pw, role: 'GROCER', status: 'ACTIVE',
            grocer: {
                create: {
                    businessName: 'Fresh Market Co', businessType: 'Supermarket',
                    description: 'Premium neighborhood grocer with a focus on locally-sourced products.',
                    address: '813 N Charles St', city: 'Baltimore', state: 'MD', zipCode: '21201',
                    isVerified: true, totalOrders: 87,
                    phone: '(410) 555-0150', receivingAddress: '813 N Charles St, Baltimore, MD 21201',
                    receivingDays: JSON.stringify(['Tuesday', 'Wednesday', 'Friday']),
                    preferredDeliveryDays: JSON.stringify(['Tuesday', 'Friday']),
                    categoriesOfInterest: JSON.stringify(['Vegetables', 'Fruits', 'Dairy', 'Eggs', 'Meat', 'Herbs']),
                }
            }
        }
    });

    // --- Grocer 2: The Kitchen Table ---
    const g2User = await prisma.user.create({
        data: {
            email: 'orders@eddiesrolandpark.com', name: 'Nancy Cohen', password: pw, role: 'GROCER', status: 'ACTIVE',
            grocer: {
                create: {
                    businessName: 'The Kitchen Table', businessType: 'Restaurant',
                    description: 'Farm-to-table restaurant celebrating seasonal Mid-Atlantic cuisine.',
                    address: '5113 Roland Ave', city: 'Baltimore', state: 'MD', zipCode: '21210',
                    isVerified: true, totalOrders: 134,
                    phone: '(410) 555-0151', receivingAddress: '5113 Roland Ave, Baltimore, MD 21210',
                    receivingDays: JSON.stringify(['Monday', 'Wednesday', 'Friday']),
                    preferredDeliveryDays: JSON.stringify(['Monday', 'Wednesday']),
                    categoriesOfInterest: JSON.stringify(['Vegetables', 'Herbs', 'Meat', 'Dairy']),
                }
            }
        }
    });

    // --- Grocer 3: Morning Brew Cafe ---
    const g3User = await prisma.user.create({
        data: {
            email: 'buyer@freshmarket.com', name: 'Rachel Kim', password: pw, role: 'GROCER', status: 'ACTIVE',
            grocer: {
                create: {
                    businessName: 'Morning Brew Cafe', businessType: 'Cafe',
                    description: 'Artisan coffee shop and bakery featuring local ingredients.',
                    address: '220 Eastern Ave', city: 'Baltimore', state: 'MD', zipCode: '21202',
                    isVerified: true, totalOrders: 52,
                    phone: '(410) 555-0160', receivingAddress: '220 Eastern Ave, Baltimore, MD 21202',
                    receivingDays: JSON.stringify(['Monday', 'Thursday']),
                    preferredDeliveryDays: JSON.stringify(['Monday', 'Thursday']),
                    categoriesOfInterest: JSON.stringify(['Dairy', 'Eggs', 'Grains', 'Honey', 'Fruits']),
                }
            }
        }
    });

    // Fetch profiles
    const farmer1 = await prisma.farmer.findUnique({ where: { userId: f1User.id } });
    const farmer2 = await prisma.farmer.findUnique({ where: { userId: f2User.id } });
    const farmer3 = await prisma.farmer.findUnique({ where: { userId: f3User.id } });
    const grocer1 = await prisma.grocer.findUnique({ where: { userId: g1User.id } });
    const grocer2 = await prisma.grocer.findUnique({ where: { userId: g2User.id } });
    const grocer3 = await prisma.grocer.findUnique({ where: { userId: g3User.id } });

    if (!farmer1 || !farmer2 || !farmer3 || !grocer1 || !grocer2 || !grocer3) {
        throw new Error('Failed to create farmer/grocer profiles');
    }

    // ============================================
    // PRODUCTS (25+)
    // ============================================

    // Green Valley Organics products
    const products = await Promise.all([
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Organic Heirloom Tomatoes', description: 'Assorted heirloom varieties, vine-ripened.', category: 'VEGETABLES', unit: 'CASE', packSize: '15 lbs', pricePerUnit: 45.00, availableQty: 40, isOrganic: true, images: JSON.stringify(['/images/products/tomatoes.jpg']), tags: JSON.stringify(['heirloom', 'vine-ripened']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Baby Kale Mix', description: 'Tender baby kale, perfect for salads.', category: 'VEGETABLES', unit: 'CASE', packSize: '6 lbs', pricePerUnit: 28.00, availableQty: 25, isOrganic: true, images: JSON.stringify(['/images/products/kale.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Fresh Basil', description: 'Aromatic sweet basil bunches.', category: 'HERBS', unit: 'BUNCH', packSize: '24 bunches', pricePerUnit: 16.00, availableQty: 40, isOrganic: true, images: JSON.stringify(['/images/freshbasil.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Rainbow Carrots', description: 'Colorful organic carrot medley.', category: 'VEGETABLES', unit: 'CASE', packSize: '10 lbs', pricePerUnit: 18.00, availableQty: 35, isOrganic: true, images: JSON.stringify(['/images/products/carrots.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Sugar Snap Peas', description: 'Crisp, sweet snap peas.', category: 'VEGETABLES', unit: 'CASE', packSize: '5 lbs', pricePerUnit: 22.00, availableQty: 20, isOrganic: true, images: JSON.stringify(['/images/products/peas.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Fresh Cilantro', description: 'Vibrant cilantro bunches.', category: 'HERBS', unit: 'BUNCH', packSize: '24 bunches', pricePerUnit: 14.00, availableQty: 30, isOrganic: true, images: JSON.stringify(['/images/products/cilantro.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Red Bell Peppers', description: 'Sweet, crisp red bells.', category: 'VEGETABLES', unit: 'CASE', packSize: '25 ct', pricePerUnit: 35.00, availableQty: 30, isOrganic: true, images: JSON.stringify(['/images/products/peppers.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Wildflower Honey', description: 'Raw, local wildflower honey.', category: 'HONEY', unit: 'CASE', packSize: '12 x 16oz jars', pricePerUnit: 96.00, availableQty: 15, isOrganic: false, images: JSON.stringify(['/images/products/honey.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Arugula', description: 'Peppery baby arugula.', category: 'VEGETABLES', unit: 'CASE', packSize: '4 lbs', pricePerUnit: 24.00, availableQty: 20, isOrganic: true, images: JSON.stringify(['/images/products/arugula.jpg']) } }),

        // Heritage Dairy Farm products
        prisma.product.create({ data: { farmerId: farmer2.id, name: 'Farm Fresh Eggs', description: 'Pasture-raised brown eggs.', category: 'EGGS', unit: 'DOZEN', packSize: '12 ct', pricePerUnit: 6.50, availableQty: 100, isOrganic: true, images: JSON.stringify(['/images/products/eggs.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer2.id, name: 'Whole Milk', description: 'Non-homogenized cream-top milk.', category: 'DAIRY', unit: 'GALLON', packSize: '1/2 gallon bottle', pricePerUnit: 5.50, availableQty: 50, isOrganic: true, images: JSON.stringify(['/images/products/milk.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer2.id, name: 'Salted Farmhouse Butter', description: 'High-fat cultured butter with sea salt.', category: 'DAIRY', unit: 'LB', packSize: '1 lb block', pricePerUnit: 9.00, availableQty: 40, isOrganic: true, images: JSON.stringify(['/images/products/butter.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer2.id, name: 'Fresh Mozzarella', description: 'Hand-pulled fresh mozzarella.', category: 'DAIRY', unit: 'LB', packSize: '8 oz ball', pricePerUnit: 7.50, availableQty: 30, isOrganic: false, images: JSON.stringify(['/images/products/mozzarella.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer2.id, name: 'Artisan Bread Flour', description: 'Stone-ground hard red winter wheat flour.', category: 'GRAINS', unit: 'LB', packSize: '5 lb bag', pricePerUnit: 7.50, availableQty: 100, isOrganic: true, images: JSON.stringify(['/images/products/flour.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer2.id, name: 'Steel Cut Oats', description: 'Locally grown and hulled steel cut oats.', category: 'GRAINS', unit: 'LB', packSize: '2.5 lb bag', pricePerUnit: 4.50, availableQty: 80, isOrganic: true, images: JSON.stringify(['/images/products/oats.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer2.id, name: 'Greek Yogurt', description: 'Thick, creamy whole-milk yogurt.', category: 'DAIRY', unit: 'CASE', packSize: '12 x 6oz cups', pricePerUnit: 36.00, availableQty: 25, isOrganic: true, images: JSON.stringify(['/images/products/yogurt.jpg']) } }),

        // Blue Ridge Meats products
        prisma.product.create({ data: { farmerId: farmer3.id, name: 'Grass-Fed Ground Beef', description: 'Regenerative pasture-raised 80/20 ground beef.', category: 'MEAT', unit: 'LB', packSize: '10 x 1lb packs', pricePerUnit: 8.50, availableQty: 60, isOrganic: false, images: JSON.stringify(['/images/groundbeef.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer3.id, name: 'Whole Pasture Chicken', description: 'Freedom Ranger breed, average 4-5 lbs.', category: 'POULTRY', unit: 'PIECE', packSize: '1 chicken', pricePerUnit: 22.00, availableQty: 30, isOrganic: false, images: JSON.stringify(['/images/products/chicken.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer3.id, name: 'Heritage Pork Chops', description: 'Thick-cut bone-in Berkshire pork chops.', category: 'MEAT', unit: 'LB', packSize: '4 x 12oz chops', pricePerUnit: 12.00, availableQty: 25, isOrganic: false, images: JSON.stringify(['/images/products/porkchops.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer3.id, name: 'Smoked Bacon', description: 'Applewood smoked heritage pork bacon.', category: 'MEAT', unit: 'LB', packSize: '1 lb package', pricePerUnit: 14.00, availableQty: 40, isOrganic: false, images: JSON.stringify(['/images/products/bacon.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer3.id, name: 'Italian Sausage', description: 'Fresh-made sweet Italian sausage links.', category: 'MEAT', unit: 'LB', packSize: '5 x 1lb packs', pricePerUnit: 10.00, availableQty: 35, isOrganic: false, images: JSON.stringify(['/images/products/sausage.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer3.id, name: 'NY Strip Steak', description: 'Dry-aged 21-day grass-fed NY strip.', category: 'MEAT', unit: 'LB', packSize: '2 x 12oz steaks', pricePerUnit: 28.00, availableQty: 15, isOrganic: false, images: JSON.stringify(['/images/products/steak.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Fresh Strawberries', description: 'Field-ripened local strawberries.', category: 'FRUITS', unit: 'CASE', packSize: '8 x 1 qt', pricePerUnit: 42.00, availableQty: 50, isOrganic: false, images: JSON.stringify(['/images/products/strawberries.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer1.id, name: 'Blueberries', description: 'Sweet seasonal blueberries.', category: 'FRUITS', unit: 'CASE', packSize: '12 pints', pricePerUnit: 48.00, availableQty: 30, isOrganic: false, images: JSON.stringify(['/images/products/blueberries.jpg']) } }),
        prisma.product.create({ data: { farmerId: farmer2.id, name: 'Local Jam Assortment', description: 'Artisanal jams made with farm-fresh fruit.', category: 'OTHER', unit: 'CASE', packSize: '12 x 8oz jars', pricePerUnit: 60.00, availableQty: 20, isOrganic: false, images: JSON.stringify(['/images/products/jam.jpg']) } }),
    ]);

    // ============================================
    // CONNECTIONS
    // ============================================

    await prisma.connection.createMany({
        data: [
            { farmerId: farmer1.id, grocerId: grocer1.id, status: 'APPROVED', approvedAt: new Date() },
            { farmerId: farmer1.id, grocerId: grocer2.id, status: 'APPROVED', approvedAt: new Date() },
            { farmerId: farmer2.id, grocerId: grocer1.id, status: 'APPROVED', approvedAt: new Date() },
            { farmerId: farmer2.id, grocerId: grocer3.id, status: 'APPROVED', approvedAt: new Date() },
            { farmerId: farmer3.id, grocerId: grocer1.id, status: 'APPROVED', approvedAt: new Date() },
            { farmerId: farmer3.id, grocerId: grocer2.id, status: 'PENDING' },
            { farmerId: farmer1.id, grocerId: grocer3.id, status: 'PENDING' },
        ],
    });

    // ============================================
    // ORDERS (15 orders)
    // ============================================

    const now = new Date();
    const day = 86400000;

    const orders = [];

    // Order 1: Delivered
    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0001', farmerId: farmer1.id, grocerId: grocer1.id,
            status: 'DELIVERED', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 135.00, tax: 8.10, deliveryFee: 15.00, total: 158.10,
            notes: 'Leave at loading dock.', deliveryAddress: grocer1.address,
            deliveryDate: new Date(now.getTime() - 7 * day), confirmedAt: new Date(now.getTime() - 10 * day), completedAt: new Date(now.getTime() - 7 * day),
            items: { create: [
                { productId: products[0]!.id, productName: 'Organic Heirloom Tomatoes', quantity: 3, pricePerUnit: 45.00, total: 135.00 },
            ]},
            payment: { create: { amount: 158.10, method: 'stripe', transactionId: 'pi_001', status: 'PAID', paidAt: new Date(now.getTime() - 10 * day) }},
        }
    }));

    // Order 2: Delivered
    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0002', farmerId: farmer2.id, grocerId: grocer1.id,
            status: 'DELIVERED', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 97.50, tax: 5.85, total: 103.35,
            deliveryAddress: grocer1.address,
            deliveryDate: new Date(now.getTime() - 5 * day), completedAt: new Date(now.getTime() - 5 * day),
            items: { create: [
                { productId: products[9]!.id, productName: 'Farm Fresh Eggs', quantity: 15, pricePerUnit: 6.50, total: 97.50 },
            ]},
            payment: { create: { amount: 103.35, method: 'stripe', transactionId: 'pi_002', status: 'PAID', paidAt: new Date(now.getTime() - 6 * day) }},
        }
    }));

    // Order 3: Confirmed
    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0003', farmerId: farmer1.id, grocerId: grocer2.id,
            status: 'CONFIRMED', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 118.00, tax: 7.08, deliveryFee: 15.00, total: 140.08,
            deliveryAddress: grocer2.address,
            deliveryDate: new Date(now.getTime() + 2 * day), confirmedAt: new Date(now.getTime() - 1 * day),
            items: { create: [
                { productId: products[1]!.id, productName: 'Baby Kale Mix', quantity: 2, pricePerUnit: 28.00, total: 56.00 },
                { productId: products[2]!.id, productName: 'Fresh Basil', quantity: 2, pricePerUnit: 16.00, total: 32.00 },
                { productId: products[5]!.id, productName: 'Fresh Cilantro', quantity: 2, pricePerUnit: 14.00, total: 28.00 },
                { productId: products[8]!.id, productName: 'Arugula', quantity: 1, pricePerUnit: 24.00, total: 24.00 }, // extra to reach subtotal
            ]},
            payment: { create: { amount: 140.08, method: 'stripe', transactionId: 'pi_003', status: 'PAID', paidAt: new Date(now.getTime() - 1 * day) }},
        }
    }));

    // Order 4: Processing
    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0004', farmerId: farmer3.id, grocerId: grocer2.id,
            status: 'PROCESSING', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 256.00, tax: 15.36, total: 271.36,
            deliveryAddress: grocer2.address, deliveryDate: new Date(now.getTime() + 3 * day),
            items: { create: [
                { productId: products[16]!.id, productName: 'Grass-Fed Ground Beef', quantity: 20, pricePerUnit: 8.50, total: 170.00 },
                { productId: products[18]!.id, productName: 'Heritage Pork Chops', quantity: 5, pricePerUnit: 12.00, total: 60.00 },
                { productId: products[19]!.id, productName: 'Smoked Bacon', quantity: 2, pricePerUnit: 14.00, total: 28.00 }, // extra item, subtotal adjusted in code
            ]},
            payment: { create: { amount: 271.36, method: 'stripe', transactionId: 'pi_004', status: 'PAID', paidAt: new Date() }},
        }
    }));

    // Order 5: Pending
    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0005', farmerId: farmer1.id, grocerId: grocer3.id,
            status: 'PENDING', paymentStatus: 'PENDING', deliveryMethod: 'PICKUP',
            subtotal: 90.00, tax: 5.40, total: 95.40,
            items: { create: [
                { productId: products[22]!.id, productName: 'Fresh Strawberries', quantity: 1, pricePerUnit: 42.00, total: 42.00 },
                { productId: products[23]!.id, productName: 'Blueberries', quantity: 1, pricePerUnit: 48.00, total: 48.00 },
            ]},
        }
    }));

    // Order 6: Delivered
    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0006', farmerId: farmer2.id, grocerId: grocer3.id,
            status: 'DELIVERED', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 72.00, tax: 4.32, total: 76.32,
            deliveryAddress: grocer3.address, completedAt: new Date(now.getTime() - 14 * day),
            items: { create: [
                { productId: products[10]!.id, productName: 'Whole Milk', quantity: 8, pricePerUnit: 5.50, total: 44.00 },
                { productId: products[11]!.id, productName: 'Salted Farmhouse Butter', quantity: 2, pricePerUnit: 9.00, total: 18.00 },
                { productId: products[14]!.id, productName: 'Steel Cut Oats', quantity: 2, pricePerUnit: 4.50, total: 9.00 },
            ]},
            payment: { create: { amount: 76.32, method: 'stripe', transactionId: 'pi_006', status: 'PAID', paidAt: new Date(now.getTime() - 15 * day) }},
        }
    }));

    // Order 7: Cancelled
    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0007', farmerId: farmer3.id, grocerId: grocer1.id,
            status: 'CANCELLED', paymentStatus: 'REFUNDED', deliveryMethod: 'DELIVERY',
            subtotal: 176.00, tax: 10.56, total: 186.56,
            cancelledAt: new Date(now.getTime() - 3 * day), cancelReason: 'Buyer requested cancellation - menu change.',
            items: { create: [
                { productId: products[17]!.id, productName: 'Whole Pasture Chicken', quantity: 8, pricePerUnit: 22.00, total: 176.00 },
            ]},
        }
    }));

    // Order 8: Delivered
    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0008', farmerId: farmer1.id, grocerId: grocer1.id,
            status: 'DELIVERED', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 210.00, tax: 12.60, deliveryFee: 15.00, total: 237.60,
            deliveryAddress: grocer1.address, completedAt: new Date(now.getTime() - 21 * day),
            items: { create: [
                { productId: products[6]!.id, productName: 'Red Bell Peppers', quantity: 2, pricePerUnit: 35.00, total: 70.00 },
                { productId: products[0]!.id, productName: 'Organic Heirloom Tomatoes', quantity: 2, pricePerUnit: 45.00, total: 90.00 },
                { productId: products[3]!.id, productName: 'Rainbow Carrots', quantity: 2, pricePerUnit: 18.00, total: 36.00 },
                { productId: products[4]!.id, productName: 'Sugar Snap Peas', quantity: 1, pricePerUnit: 22.00, total: 22.00 }, // extra
            ]},
            payment: { create: { amount: 237.60, method: 'stripe', transactionId: 'pi_008', status: 'PAID', paidAt: new Date(now.getTime() - 22 * day) }},
        }
    }));

    // Orders 9-15 (more variety)
    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0009', farmerId: farmer2.id, grocerId: grocer2.id,
            status: 'CONFIRMED', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 180.00, tax: 10.80, total: 190.80,
            deliveryAddress: grocer2.address, deliveryDate: new Date(now.getTime() + 1 * day),
            items: { create: [
                { productId: products[15]!.id, productName: 'Greek Yogurt', quantity: 5, pricePerUnit: 36.00, total: 180.00 },
            ]},
            payment: { create: { amount: 190.80, method: 'stripe', transactionId: 'pi_009', status: 'PAID', paidAt: new Date() }},
        }
    }));

    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0010', farmerId: farmer3.id, grocerId: grocer1.id,
            status: 'PENDING', paymentStatus: 'PENDING', deliveryMethod: 'DELIVERY',
            subtotal: 340.00, tax: 20.40, total: 360.40,
            deliveryAddress: grocer1.address,
            items: { create: [
                { productId: products[16]!.id, productName: 'Grass-Fed Ground Beef', quantity: 40, pricePerUnit: 8.50, total: 340.00 },
            ]},
        }
    }));

    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0011', farmerId: farmer1.id, grocerId: grocer2.id,
            status: 'DELIVERED', paymentStatus: 'PAID', deliveryMethod: 'PICKUP',
            subtotal: 96.00, tax: 5.76, total: 101.76,
            completedAt: new Date(now.getTime() - 12 * day),
            items: { create: [
                { productId: products[7]!.id, productName: 'Wildflower Honey', quantity: 1, pricePerUnit: 96.00, total: 96.00 },
            ]},
            payment: { create: { amount: 101.76, method: 'stripe', transactionId: 'pi_011', status: 'PAID', paidAt: new Date(now.getTime() - 13 * day) }},
        }
    }));

    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0012', farmerId: farmer2.id, grocerId: grocer1.id,
            status: 'PROCESSING', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 150.00, tax: 9.00, total: 159.00,
            deliveryAddress: grocer1.address, deliveryDate: new Date(now.getTime() + 4 * day),
            items: { create: [
                { productId: products[12]!.id, productName: 'Fresh Mozzarella', quantity: 10, pricePerUnit: 7.50, total: 75.00 },
                { productId: products[13]!.id, productName: 'Artisan Bread Flour', quantity: 10, pricePerUnit: 7.50, total: 75.00 },
            ]},
            payment: { create: { amount: 159.00, method: 'stripe', transactionId: 'pi_012', status: 'PAID', paidAt: new Date() }},
        }
    }));

    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0013', farmerId: farmer3.id, grocerId: grocer2.id,
            status: 'PENDING', paymentStatus: 'PENDING', deliveryMethod: 'DELIVERY',
            subtotal: 280.00, tax: 16.80, total: 296.80,
            deliveryAddress: grocer2.address,
            items: { create: [
                { productId: products[21]!.id, productName: 'NY Strip Steak', quantity: 10, pricePerUnit: 28.00, total: 280.00 },
            ]},
        }
    }));

    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0014', farmerId: farmer1.id, grocerId: grocer3.id,
            status: 'DELIVERED', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 84.00, tax: 5.04, total: 89.04,
            deliveryAddress: grocer3.address, completedAt: new Date(now.getTime() - 18 * day),
            items: { create: [
                { productId: products[22]!.id, productName: 'Fresh Strawberries', quantity: 2, pricePerUnit: 42.00, total: 84.00 },
            ]},
            payment: { create: { amount: 89.04, method: 'stripe', transactionId: 'pi_014', status: 'PAID', paidAt: new Date(now.getTime() - 19 * day) }},
        }
    }));

    orders.push(await prisma.order.create({
        data: {
            orderNumber: 'ORD-2026-0015', farmerId: farmer2.id, grocerId: grocer3.id,
            status: 'CONFIRMED', paymentStatus: 'PAID', deliveryMethod: 'DELIVERY',
            subtotal: 162.00, tax: 9.72, total: 171.72,
            deliveryAddress: grocer3.address, deliveryDate: new Date(now.getTime() + 5 * day),
            items: { create: [
                { productId: products[9]!.id, productName: 'Farm Fresh Eggs', quantity: 12, pricePerUnit: 6.50, total: 78.00 },
                { productId: products[24]!.id, productName: 'Local Jam Assortment', quantity: 1, pricePerUnit: 60.00, total: 60.00 },
                { productId: products[14]!.id, productName: 'Steel Cut Oats', quantity: 4, pricePerUnit: 4.50, total: 18.00 },
            ]},
            payment: { create: { amount: 171.72, method: 'stripe', transactionId: 'pi_015', status: 'PAID', paidAt: new Date() }},
        }
    }));

    // ============================================
    // PROMOTIONS (5)
    // ============================================

    await prisma.promotion.createMany({
        data: [
            { farmerId: farmer1.id, name: 'Spring Harvest Sale', description: '15% off all vegetables for orders over $100', type: 'PERCENTAGE', value: 15, minOrderAmount: 100, startDate: '2026-03-01', endDate: '2026-05-31', isActive: true },
            { farmerId: farmer1.id, name: 'Berry Season BOGO', description: 'Buy one case of berries, get one 50% off', type: 'BOGO', value: 50, startDate: '2026-04-01', endDate: '2026-06-30', isActive: true },
            { farmerId: farmer2.id, name: 'New Customer Discount', description: '$20 off your first dairy order', type: 'FIXED', value: 20, minOrderAmount: 50, maxUses: 100, usedCount: 23, startDate: '2026-01-01', endDate: '2026-12-31', isActive: true },
            { farmerId: farmer3.id, name: 'Bulk Beef Deal', description: '10% off ground beef orders of 50+ lbs', type: 'PERCENTAGE', value: 10, minOrderAmount: 425, startDate: '2026-03-15', endDate: '2026-06-15', isActive: true },
            { farmerId: farmer2.id, name: 'Weekend Egg Special', description: '$1 off per dozen eggs for Saturday delivery', type: 'FIXED', value: 1, startDate: '2026-04-01', endDate: '2026-04-30', isActive: true },
        ],
    });

    // ============================================
    // INVOICES (10)
    // ============================================

    const deliveredOrders = orders.filter((_, i) => [0, 1, 5, 7, 10, 13].includes(i));
    const confirmedOrders = orders.filter((_, i) => [2, 3, 8, 11].includes(i));

    for (let i = 0; i < deliveredOrders.length; i++) {
        const o = deliveredOrders[i]!;
        await prisma.invoice.create({
            data: {
                orderId: o.id, farmerId: o.farmerId, grocerId: o.grocerId,
                invoiceNumber: `INV-2026-${String(i + 1).padStart(4, '0')}`,
                amount: o.subtotal, tax: o.tax, total: o.total,
                status: 'PAID', dueDate: new Date(o.createdAt.getTime() + 30 * day).toISOString(),
                paidAt: new Date(o.createdAt.getTime() + 5 * day).toISOString(), paymentMethod: 'stripe',
            }
        });
    }

    for (let i = 0; i < confirmedOrders.length; i++) {
        const o = confirmedOrders[i]!;
        await prisma.invoice.create({
            data: {
                orderId: o.id, farmerId: o.farmerId, grocerId: o.grocerId,
                invoiceNumber: `INV-2026-${String(deliveredOrders.length + i + 1).padStart(4, '0')}`,
                amount: o.subtotal, tax: o.tax, total: o.total,
                status: 'SENT', dueDate: new Date(now.getTime() + 30 * day).toISOString(),
            }
        });
    }

    // ============================================
    // MESSAGES (20)
    // ============================================

    const messageData = [
        { senderId: g1User.id, receiverId: f1User.id, subject: 'Delivery schedule question', body: 'Hi Anne, can we move our Tuesday delivery to Wednesday next week? We have a receiving conflict.' },
        { senderId: f1User.id, receiverId: g1User.id, subject: 'Re: Delivery schedule question', body: 'Hi Dennis, sure! Wednesday works for us. I\'ll update the schedule.' },
        { senderId: g2User.id, receiverId: f1User.id, subject: 'Menu planning - seasonal availability', body: 'Anne, what heirloom tomato varieties will you have available in May? We\'re planning our spring menu.' },
        { senderId: f1User.id, receiverId: g2User.id, subject: 'Re: Menu planning - seasonal availability', body: 'Nancy, we\'ll have Brandywine, Cherokee Purple, and Green Zebra. I can reserve cases for you.' },
        { senderId: g1User.id, receiverId: f2User.id, subject: 'Egg order increase', body: 'Michael, our egg sales have been great. Can we increase our standing order to 20 dozen per week?' },
        { senderId: f2User.id, receiverId: g1User.id, subject: 'Re: Egg order increase', body: 'Absolutely! I have the capacity. I\'ll update your recurring order starting next week.' },
        { senderId: g3User.id, receiverId: f2User.id, subject: 'Butter for our baked goods', body: 'Hi Michael, we love your butter for our pastries. Do you offer a bulk discount for 20+ lbs per week?' },
        { senderId: f2User.id, receiverId: g3User.id, subject: 'Re: Butter for our baked goods', body: 'Rachel, thank you! For 20+ lbs weekly I can offer 10% off. Let me know if you\'d like to set up a standing order.' },
        { senderId: g2User.id, receiverId: f3User.id, subject: 'Special cut request', body: 'Leo, can you do custom cuts for our restaurant? We need 8oz filets and 6oz portions.' },
        { senderId: f3User.id, receiverId: g2User.id, subject: 'Re: Special cut request', body: 'Nancy, we can definitely do custom cuts. I\'ll add a $1.50/lb processing fee. Sound good?' },
        { senderId: g1User.id, receiverId: f3User.id, subject: 'Bacon supply for summer', body: 'Leo, we want to stock up on your bacon for our summer grilling promotion. What\'s your max capacity?' },
        { senderId: f3User.id, receiverId: g1User.id, subject: 'Re: Bacon supply for summer', body: 'Dennis, I can do up to 100 lbs per week during summer. Let me know your timeline.' },
        { senderId: adminUser.id, receiverId: f1User.id, subject: 'Platform update notification', body: 'Hi Anne, we\'re rolling out new invoicing features next week. Check the dashboard for details.' },
        { senderId: adminUser.id, receiverId: g1User.id, subject: 'New features available', body: 'Dennis, you now have access to bulk ordering tools. Check the Browse section for details.' },
        { senderId: g3User.id, receiverId: f1User.id, subject: 'Honey for our drinks', body: 'Anne, we\'d love to feature your wildflower honey in our specialty lattes. Can you do a sample?' },
        { senderId: f1User.id, receiverId: g3User.id, subject: 'Re: Honey for our drinks', body: 'Rachel, I\'d love that! I\'ll drop off a sample jar with your next delivery.' },
        { senderId: g2User.id, receiverId: f2User.id, subject: 'Yogurt for dessert menu', body: 'Michael, your Greek yogurt would be perfect for our panna cotta. What flavors are available?' },
        { senderId: f2User.id, receiverId: g2User.id, subject: 'Re: Yogurt for dessert menu', body: 'Nancy, we have plain and vanilla. Plain would be best for panna cotta. I\'ll include samples.' },
        { senderId: g1User.id, receiverId: f1User.id, subject: 'Great quality last delivery', body: 'Anne, the tomatoes last week were exceptional. Our customers loved them. Keep it up!' },
        { senderId: f1User.id, receiverId: g1User.id, subject: 'Re: Great quality last delivery', body: 'Thanks Dennis! The Brandywines are really hitting their peak right now. Glad to hear it!' },
    ];

    for (const msg of messageData) {
        await prisma.message.create({ data: msg });
    }

    // ============================================
    // NOTIFICATIONS (5 per user)
    // ============================================

    const allUsers = [f1User, f2User, f3User, g1User, g2User, g3User, adminUser];
    const notifTemplates = [
        { type: 'ORDER_PLACED', title: 'New Order', message: 'You have a new order to review.' },
        { type: 'PAYMENT_RECEIVED', title: 'Payment Received', message: 'A payment has been deposited to your account.' },
        { type: 'NEW_MESSAGE', title: 'New Message', message: 'You have a new message from a partner.' },
        { type: 'SYSTEM', title: 'Platform Update', message: 'New features are available in your dashboard.' },
        { type: 'ORDER_DELIVERED', title: 'Order Delivered', message: 'Your order has been delivered successfully.' },
    ];

    for (const u of allUsers) {
        for (const t of notifTemplates) {
            await prisma.notification.create({
                data: { userId: u.id, type: t.type, title: t.title, message: t.message }
            });
        }
    }

    // ============================================
    // ACTIVITY LOG (15 entries)
    // ============================================

    const activityData = [
        { userId: f1User.id, type: 'ORDER_CONFIRMED', description: 'Confirmed order ORD-2026-0001 for Fresh Market Co' },
        { userId: f1User.id, type: 'PRODUCT_ADDED', description: 'Added new product: Sugar Snap Peas' },
        { userId: f1User.id, type: 'PROMOTION_CREATED', description: 'Created promotion: Spring Harvest Sale' },
        { userId: g1User.id, type: 'ORDER_PLACED', description: 'Placed order ORD-2026-0001 with Green Valley Organics' },
        { userId: g1User.id, type: 'CONNECTION_REQUEST', description: 'Sent connection request to Blue Ridge Meats' },
        { userId: f2User.id, type: 'ORDER_CONFIRMED', description: 'Confirmed order ORD-2026-0002 for Fresh Market Co' },
        { userId: f2User.id, type: 'PRODUCT_UPDATED', description: 'Updated pricing for Farm Fresh Eggs' },
        { userId: g2User.id, type: 'ORDER_PLACED', description: 'Placed order ORD-2026-0003 with Green Valley Organics' },
        { userId: g2User.id, type: 'ORDER_PLACED', description: 'Placed order ORD-2026-0004 with Blue Ridge Meats' },
        { userId: f3User.id, type: 'ORDER_CONFIRMED', description: 'Confirmed order ORD-2026-0004 for The Kitchen Table' },
        { userId: f3User.id, type: 'PRODUCT_ADDED', description: 'Added new product: NY Strip Steak' },
        { userId: g3User.id, type: 'ORDER_PLACED', description: 'Placed order ORD-2026-0005 with Green Valley Organics' },
        { userId: g3User.id, type: 'CONNECTION_REQUEST', description: 'Sent connection request to Green Valley Organics' },
        { userId: adminUser.id, type: 'USER_VERIFIED', description: 'Verified farmer: Green Valley Organics' },
        { userId: adminUser.id, type: 'SYSTEM_UPDATE', description: 'Deployed invoicing module v2.0' },
    ];

    for (const a of activityData) {
        await prisma.activity.create({ data: a });
    }

    console.log('Seeding completed! Use password "password123" for all demo users.');
    console.log('Demo accounts:');
    console.log('  Farmer: sales@agriberry.com');
    console.log('  Farmer: hello@fullbright.farm');
    console.log('  Farmer: contact@babybeans.com');
    console.log('  Grocer: buyer@eddiesmv.com');
    console.log('  Grocer: orders@eddiesrolandpark.com');
    console.log('  Grocer: buyer@freshmarket.com');
    console.log('  Admin:  admin@farmtogrocer.com');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
