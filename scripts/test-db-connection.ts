import { PrismaClient } from '@prisma/client';

async function testConnection() {
    console.log('🔍 Testing Database Connection...');

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('❌ Error: DATABASE_URL environment variable is not set.');
        process.exit(1);
    }

    // Mask sensitive info for logging
    try {
        const url = new URL(databaseUrl);
        console.log(`📡 Attempting to connect to: ${url.host}`);
        console.log(`👤 Username: ${url.username}`);
        console.log(`📂 Database: ${url.pathname.substring(1)}`);
    } catch (e) {
        console.log('📡 Attempting to connect (URL parsing failed, checking raw format)');
    }

    const prisma = new PrismaClient();

    try {
        await prisma.$connect();
        console.log('✅ Success! Database is reachable and authenticated.');

        const result = await prisma.$queryRaw`SELECT current_database(), current_user, version();`;
        console.log('📊 Connection Details:', result);

        await prisma.$disconnect();
    } catch (error: any) {
        console.error('❌ Connection Failed!');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);

        if (error.message.includes('Authentication failed')) {
            console.log('\n💡 Troubleshooting Tip:');
            console.log('1. Verify your password in the Amplify Console.');
            console.log('2. Check if your RDS instance requires SSL (try adding ?sslmode=require).');
            console.log('3. Ensure the database name in your URL matches the "Initial database name" in RDS.');
        }

        process.exit(1);
    }
}

testConnection();
