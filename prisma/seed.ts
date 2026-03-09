import { PrismaClient, ProductCategory, ProductUnit, ProductStatus, UserRole, AccountStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting database seed...");

    // 1. Clean up existing data
    console.log("Cleaning up existing data...");
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.product.deleteMany();
    await prisma.farmer.deleteMany();
    await prisma.grocer.deleteMany();
    await prisma.user.deleteMany();

    // 2. Create Farmer User
    const hashedPassword = await bcrypt.hash("password123", 10);

    const farmerUser = await prisma.user.create({
        data: {
            email: "farmer@example.com",
            password: hashedPassword,
            name: "John's Organic Farm",
            role: UserRole.FARMER,
            status: AccountStatus.ACTIVE,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
    });

    const farmerProfile = await prisma.farmer.create({
        data: {
            userId: farmerUser.id,
            farmName: "Green Valley Organics",
            description: "A family-owned organic farm specialized in seasonal vegetables and fruits.",
            address: "123 Farm Road",
            city: "Sacramento",
            state: "CA",
            zipCode: "95814",
            certifications: ["Organic", "Non-GMO"],
            isVerified: true,
        },
    });

    // 3. Create Sample Products
    const products = [
        {
            name: "Organic Red Heirloom Tomatoes",
            description: "Sweet and juicy sun-ripened tomatoes, perfect for salads and sauces.",
            category: ProductCategory.VEGETABLES,
            unit: ProductUnit.LB,
            pricePerUnit: 3.50,
            availableQty: 150,
            images: ["/images/hero/Hero-1.jpg"],
            isOrganic: true,
            tags: ["tomato", "organic", "heirloom"],
        },
        {
            name: "Fresh Baby Spinach",
            description: "Triple-washed tender baby spinach leaves. High in nutrients and very versatile.",
            category: ProductCategory.VEGETABLES,
            unit: ProductUnit.LB,
            pricePerUnit: 4.25,
            availableQty: 80,
            images: ["/images/hero/Hero-5.jpg"],
            isOrganic: true,
            tags: ["spinach", "organic", "greens"],
        },
        {
            name: "Crisp Gala Apples",
            description: "Sweet and crunchy apples freshly harvested from our orchard.",
            category: ProductCategory.FRUITS,
            unit: ProductUnit.LB,
            pricePerUnit: 2.20,
            availableQty: 300,
            images: ["/images/hero/Hero-5.jpg"],
            isOrganic: false,
            tags: ["apple", "gala", "fruit"],
        },
        {
            name: "Raw Wildflower Honey",
            description: "100% pure unfiltered honey from our local honeybees.",
            category: ProductCategory.HONEY,
            unit: ProductUnit.PIECE,
            pricePerUnit: 12.00,
            availableQty: 45,
            images: ["/images/hero/Hero-1.jpg"],
            isOrganic: true,
            tags: ["honey", "raw", "local"],
        },
        {
            name: "Artisan Goat Cheese",
            description: "Creamy and tangy goat cheese made in small batches.",
            category: ProductCategory.DAIRY,
            unit: ProductUnit.PIECE,
            pricePerUnit: 8.50,
            availableQty: 30,
            images: ["/images/hero/Hero-1.jpg"],
            isOrganic: false,
            tags: ["cheese", "goat", "artisan"],
        },
    ];

    console.log(`Creating ${products.length} sample products...`);

    for (const productData of products) {
        await prisma.product.create({
            data: {
                ...productData,
                farmerId: farmerProfile.id,
                status: ProductStatus.ACTIVE,
            },
        });
    }

    // 4. Create Grocer User
    const grocerUser = await prisma.user.create({
        data: {
            email: "grocer@example.com",
            password: hashedPassword,
            name: "Fresh Market Deli",
            role: UserRole.GROCER,
            status: AccountStatus.ACTIVE,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Market",
        },
    });

    await prisma.grocer.create({
        data: {
            userId: grocerUser.id,
            businessName: "Fresh Market Deli",
            businessType: "Deli/Cafe",
            address: "456 City Center",
            city: "San Francisco",
            state: "CA",
            zipCode: "94103",
            isVerified: true,
        },
    });

    console.log("✅ Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
