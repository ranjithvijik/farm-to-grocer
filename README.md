# 🌾 Farm to Grocer

<div align="center">

![Farm to Grocer](https://img.shields.io/badge/Farm_to_Grocer-MVP-green?style=for-the-badge&logo=leaf&logoColor=white)

**Connect Local Farmers with Grocers — Fresh Produce, Direct from the Source**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.14-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-Ready-FF9900?style=for-the-badge&logo=aws-amplify)](https://aws.amazon.com/amplify/)

[Live Demo](https://farmtogrocer.com) • [Documentation](#-documentation) • [Report Bug](https://github.com/your-org/farm-to-grocer/issues) • [Request Feature](https://github.com/your-org/farm-to-grocer/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Complete File List](#-complete-file-list)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
  - [AWS Amplify Deployment](#aws-amplify-deployment-recommended)
  - [Docker Deployment](#docker-deployment)
  - [Vercel Deployment](#vercel-deployment)
  - [Manual VPS Deployment](#manual-vps-deployment)
- [API Documentation](#-api-documentation)
- [Configuration Files](#-configuration-files)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🌟 About the Project

**Farm to Grocer** is a B2B marketplace platform that connects local farmers directly with grocery stores, restaurants, and food businesses. Our mission is to eliminate middlemen, ensure fair prices for farmers, and provide grocers with the freshest local produce.

### The Problem

- 🚜 Farmers struggle to find reliable buyers for their produce
- 🏪 Grocers have limited access to local, fresh products
- 💰 Traditional supply chains add unnecessary costs and delays
- 📱 Small farms lack the technology to compete with large distributors

### Our Solution

Farm to Grocer provides a modern, easy-to-use platform where:
- **Farmers** can list products, manage inventory, and receive orders
- **Grocers** can browse local farms, place orders, and track deliveries
- **Both parties** benefit from transparent pricing and direct communication

---

## ✨ Features

### For Farmers 🧑‍🌾
| Feature | Description |
|---------|-------------|
| ✅ Product Catalog | Manage products with images, descriptions, and pricing |
| ✅ Inventory Tracking | Real-time stock management with low-stock alerts |
| ✅ Order Management | Dashboard to view, confirm, and fulfill orders |
| ✅ Revenue Analytics | Track sales, revenue trends, and top products |
| ✅ Customer Ratings | Build reputation through grocer reviews |
| ✅ Delivery Scheduling | Set pickup times and delivery windows |

### For Grocers 🏪
| Feature | Description |
|---------|-------------|
| ✅ Browse Local Farms | Discover farmers in your area |
| ✅ Advanced Search | Filter by category, organic, price, location |
| ✅ Shopping Cart | Multi-farm ordering with quantity controls |
| ✅ Order History | View past orders and quick reorder |
| ✅ Favorite Suppliers | Save preferred farmers for easy access |
| ✅ Delivery Tracking | Real-time order status updates |

### Platform Features 🚀
| Feature | Description |
|---------|-------------|
| ✅ Secure Auth | Email/password + Google OAuth + Magic Links |
| ✅ Modern Design Theme | Global premium glassmorphism aesthetic with engaging micro-animations |
| ✅ Role-Based Access | Farmer, Grocer, and Admin roles |
| ✅ Real-time Notifications | Order updates, messages, alerts |
| ✅ Responsive Design | Mobile-first, works on all devices |
| ✅ Dark Mode | Full dark theme support |
| ✅ Stripe Payments | Secure payment processing |
| ✅ System Observability | Robust `/api/health` monitoring for db/memory/config tracking |
| ✅ Email Notifications | Transactional emails via Resend |

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 14.2.3 | React framework with App Router |
| [React](https://react.dev/) | 18.3.1 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.4.5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.4 | Utility-first CSS |
| [Radix UI](https://www.radix-ui.com/) | Latest | Accessible components |
| [Lucide React](https://lucide.dev/) | 0.379.0 | Icon library |
| [React Hook Form](https://react-hook-form.com/) | 7.51.5 | Form handling |
| [Zod](https://zod.dev/) | 3.23.8 | Schema validation |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | 14.2.3 | API endpoints |
| [Prisma](https://www.prisma.io/) | 5.14.0 | ORM & database toolkit |
| [NextAuth.js](https://next-auth.js.org/) | 4.24.7 | Authentication |
| [Stripe](https://stripe.com/) | 15.8.0 | Payment processing |

### Database & Storage
| Technology | Version | Purpose |
|------------|---------|---------|
| [PostgreSQL](https://www.postgresql.org/) | 16 | Primary database |
| [Redis](https://redis.io/) | 7 | Caching & sessions |
| [UploadThing](https://uploadthing.com/) | 6.12.0 | File uploads |

### DevOps & Deployment
| Technology | Purpose |
|------------|---------|
| [AWS Amplify](https://aws.amazon.com/amplify/) | Primary hosting & CI/CD |
| [Docker](https://www.docker.com/) | Containerization |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipelines |
| [Vercel](https://vercel.com/) | Alternative hosting |

---

## 📁 Project Structure

```
farm-to-grocer/
│
├── 📄 .env.example                    # Environment variables template
├── 📄 .eslintrc.json                  # ESLint configuration
├── 📄 .gitignore                      # Git ignore rules
├── 📄 .nvmrc                          # Node.js version (20.11.1)
├── 📄 .prettierrc                     # Prettier configuration
├── 📄 amplify.yml                     # AWS Amplify build spec
├── 📄 docker-compose.yml              # Docker services
├── 📄 Dockerfile                      # Container build
├── 📄 middleware.ts                   # Next.js middleware (auth)
├── 📄 next.config.js                  # Next.js configuration
├── 📄 package.json                    # Dependencies & scripts
├── 📄 postcss.config.js               # PostCSS configuration
├── 📄 README.md                       # This file
├── 📄 tailwind.config.ts              # Tailwind CSS theme
├── 📄 tsconfig.json                   # TypeScript configuration
│
├── 📁 prisma/
│   └── 📄 schema.prisma               # Database schema (15 models)
│
├── 📁 types/
│   └── 📄 index.ts                    # TypeScript definitions
│
├── 📁 lib/
│   ├── 📄 auth.ts                     # NextAuth configuration
│   ├── 📄 prisma.ts                   # Prisma client singleton
│   └── 📄 utils.ts                    # Utility functions
│
├── 📁 components/
│   ├── 📁 ui/
│   │   ├── 📄 Button.tsx              # Button (9 variants)
│   │   ├── 📄 Card.tsx                # Card system
│   │   ├── 📄 Input.tsx               # Form inputs
│   │   ├── 📄 Modal.tsx               # Modal/Dialog/Drawer
│   │   ├── 📄 Skeleton.tsx            # Loading skeletons
│   │   └── 📄 Toaster.tsx             # Toast notifications
│   │
│   ├── 📄 Footer.tsx                  # Site footer
│   ├── 📄 Navbar.tsx                  # Navigation bar
│   ├── 📄 OrderTable.tsx              # Orders data table
│   ├── 📄 ProductCard.tsx             # Product display card
│   └── 📄 providers.tsx               # Context providers
│
├── 📁 app/
│   ├── 📄 globals.css                 # Global styles
│   ├── 📄 layout.tsx                  # Root layout
│   ├── 📄 page.tsx                    # Landing page
│   │
│   ├── 📁 (auth)/
│   │   ├── 📁 login/
│   │   │   ├── 📄 login-form.tsx      # Login form
│   │   │   └── 📄 page.tsx            # Login page
│   │   └── 📁 register/
│   │       ├── 📄 page.tsx            # Register page
│   │       └── 📄 register-form.tsx   # Register form
│   │
│   ├── 📁 (dashboard)/
│   │   ├── 📄 dashboard-shell.tsx     # Dashboard shell
│   │   ├── 📄 layout.tsx              # Dashboard layout
│   │   ├── 📁 farmer/
│   │   │   ├── 📄 page.tsx            # Farmer dashboard
│   │   │   └── 📁 products/
│   │   │       └── 📄 page.tsx        # Product management
│   │   └── 📁 grocer/
│   │       ├── 📄 page.tsx            # Grocer dashboard
│   │       └── 📁 orders/
│   │           └── 📄 page.tsx        # Order management
│   │
│   ├── 📁 onboarding/
│   │   └── 📄 page.tsx                # Onboarding flow
│   │
│   ├── 📁 suspended/
│   │   └── 📄 page.tsx                # Suspended account
│   │
│   └── 📁 api/
│       ├── 📁 auth/[...nextauth]/
│       │   └── 📄 route.ts            # NextAuth handler
│       ├── 📁 health/
│       │   └── 📄 route.ts            # Health check
│       ├── 📁 orders/
│       │   ├── 📄 route.ts            # Orders CRUD
│       │   └── 📁 [id]/
│       │       └── 📄 route.ts        # Single order
│       └── 📁 products/
│           ├── 📄 route.ts            # Products CRUD
│           └── 📁 [id]/
│               └── 📄 route.ts        # Single product
│
└── 📁 public/
    └── 📁 images/                     # Static images
```

---

## 📋 Complete File List

### Summary: **45 Files Generated**

| Category | Count | Status |
|----------|-------|--------|
| Configuration Files | 14 | ✅ Complete |
| Library/Utilities | 3 | ✅ Complete |
| Type Definitions | 1 | ✅ Complete |
| API Routes | 6 | ✅ Complete |
| UI Components | 6 | ✅ Complete |
| Feature Components | 5 | ✅ Complete |
| App Pages & Layouts | 27 | ✅ Complete (Includes Docs, Legal, Marketing) |
| **TOTAL** | **62** | ✅ **100%** |

### 🔧 Configuration Files (14)

| # | File | Description |
|---|------|-------------|
| 1 | `prisma/schema.prisma` | Database schema with 15 models |
| 2 | `package.json` | Dependencies & npm scripts |
| 3 | `tailwind.config.ts` | Tailwind CSS configuration |
| 4 | `postcss.config.js` | PostCSS plugins |
| 5 | `tsconfig.json` | TypeScript compiler options |
| 6 | `next.config.js` | Next.js configuration |
| 7 | `middleware.ts` | Route protection & RBAC |
| 8 | `.env.example` | Environment variables template |
| 9 | `.gitignore` | Git ignore rules |
| 10 | `.eslintrc.json` | ESLint rules |
| 11 | `.prettierrc` | Code formatting rules |
| 12 | `.nvmrc` | Node.js version (20.11.1) |
| 13 | `amplify.yml` | AWS Amplify build specification |
| 14 | `docker-compose.yml` | Docker services configuration |
| 15 | `Dockerfile` | Container build (multi-stage) |
| 16 | `README.md` | Project documentation |

### 📚 Library/Utilities (3)

| # | File | Description |
|---|------|-------------|
| 17 | `lib/prisma.ts` | Prisma client singleton with helpers |
| 18 | `lib/auth.ts` | NextAuth.js configuration |
| 19 | `lib/utils.ts` | Utility functions (cn, formatters) |

### 📝 Type Definitions (1)

| # | File | Description |
|---|------|-------------|
| 20 | `types/index.ts` | TypeScript types & interfaces |

### 🌐 API Routes (5)

| # | File | Endpoints |
|---|------|-----------|
| 21 | `app/api/auth/[...nextauth]/route.ts` | NextAuth handler |
| 22 | `app/api/products/route.ts` | GET (list), POST (create) |
| 23 | `app/api/products/[id]/route.ts` | GET, PUT, PATCH, DELETE |
| 24 | `app/api/orders/route.ts` | GET (list), POST (create) |
| 25 | `app/api/orders/[id]/route.ts` | GET, PUT, PATCH, DELETE |

### 🎨 UI Components (6)

| # | File | Exports |
|---|------|---------|
| 26 | `components/ui/Button.tsx` | Button, ButtonGroup, IconButton |
| 27 | `components/ui/Card.tsx` | Card, CardHeader, CardContent, etc. |
| 28 | `components/ui/Input.tsx` | Input, PasswordInput, SearchInput, etc. |
| 29 | `components/ui/Modal.tsx` | Modal, ConfirmModal, Drawer |
| 30 | `components/ui/Skeleton.tsx` | Skeleton loading components |
| 31 | `components/ui/Toaster.tsx` | Toast notification system |

### 🧩 Feature Components (5)

| # | File | Purpose |
|---|------|---------|
| 32 | `components/Navbar.tsx` | Responsive navigation with auth |
| 33 | `components/Footer.tsx` | Site footer with links |
| 34 | `components/ProductCard.tsx` | Product display card |
| 35 | `components/OrderTable.tsx` | Orders data table |
| 36 | `components/providers.tsx` | Context providers wrapper |

### 📄 App Pages & Layouts (15)

| # | File | Route |
|---|------|-------|
| 37 | `app/layout.tsx` | Root layout |
| 38 | `app/page.tsx` | `/` (Landing) |
| 39 | `app/globals.css` | Global styles |
| 40 | `app/(auth)/login/page.tsx` | `/login` |
| 41 | `app/(auth)/login/login-form.tsx` | Login form component |
| 42 | `app/(auth)/register/page.tsx` | `/register` |
| 43 | `app/(auth)/register/register-form.tsx` | Register form component |
| 44 | `app/(dashboard)/layout.tsx` | Dashboard layout |
| 45 | `app/(dashboard)/dashboard-shell.tsx` | Dashboard shell |
| 46 | `app/(dashboard)/farmer/page.tsx` | `/farmer` |
| 47 | `app/(dashboard)/farmer/products/page.tsx` | `/farmer/products` |
| 48 | `app/(dashboard)/grocer/page.tsx` | `/grocer` |
| 49 | `app/(dashboard)/grocer/orders/page.tsx` | `/grocer/orders` |
| 50 | `app/onboarding/page.tsx` | `/onboarding` |
| 51 | `app/suspended/page.tsx` | `/suspended` |

---

## 🚀 Getting Started

### Prerequisites

| Software | Version | Required | Download |
|----------|---------|----------|----------|
| Node.js | 20.11.1 | ✅ Yes | [nodejs.org](https://nodejs.org/) |
| pnpm/npm | 8.0+ | ✅ Yes | `npm install -g pnpm` |
| PostgreSQL | 14+ | ✅ Yes | [postgresql.org](https://www.postgresql.org/) |
| Git | 2.0+ | ✅ Yes | [git-scm.com](https://git-scm.com/) |
| Docker | 24.0+ | ❌ Optional | [docker.com](https://www.docker.com/) |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/farm-to-grocer.git
cd farm-to-grocer

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Set up the database
pnpm db:push

# 5. (Optional) Seed with sample data
pnpm db:seed

# 6. Start the development server
pnpm dev

# 7. Open http://localhost:3000
```

### Environment Variables

Create a `.env.local` file with these variables:

```env
# ═══════════════════════════════════════════════════════════════
# REQUIRED VARIABLES
# ═══════════════════════════════════════════════════════════════

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/farmtogrocer"

# Authentication
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# ═══════════════════════════════════════════════════════════════
# OPTIONAL VARIABLES
# ═══════════════════════════════════════════════════════════════

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe Payments
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# File Uploads
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."

# Email
RESEND_API_KEY="re_..."
```

### Database Setup

#### Option 1: Local PostgreSQL
```bash
createdb farmtogrocer
npx prisma db push
```

#### Option 2: Docker
```bash
docker-compose up -d db
npx prisma db push
```

#### Option 3: Cloud (Neon/Supabase)
1. Create a project on [Neon](https://neon.tech/) or [Supabase](https://supabase.com/)
2. Copy connection string to `DATABASE_URL`
3. Run `npx prisma db push`

---

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (port 3000) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format` | Format code with Prettier |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push schema to database |
| `pnpm db:migrate` | Run migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:seed` | Seed database |
| `pnpm test` | Run tests |
| `pnpm test:watch` | Run tests in watch mode |

### Code Style

```bash
# Check linting
pnpm lint

# Fix linting errors
pnpm lint:fix

# Format all files
pnpm format
```

---

## 🚢 Deployment

### AWS Amplify Deployment (Recommended)

AWS Amplify provides the easiest deployment with automatic CI/CD from GitHub.

#### Step 1: Connect Repository

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Select **GitHub** and authorize
4. Choose your repository and branch (`main`)

#### Step 2: Configure Build Settings

Amplify will auto-detect the `amplify.yml` file. Verify settings:

```yaml
# amplify.yml is already configured with:
- Node.js 20.11.1
- Prisma client generation
- Database migrations (main branch only)
- Build caching
- Security headers
```

#### Step 3: Set Environment Variables

In Amplify Console → **App Settings** → **Environment Variables**:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | `your-secret-key` |
| `NEXTAUTH_URL` | `https://your-app.amplifyapp.com` |
| `GOOGLE_CLIENT_ID` | (optional) |
| `STRIPE_SECRET_KEY` | (optional) |

#### Step 4: Deploy

Click **"Save and deploy"**. Amplify will:
1. Pull code from GitHub
2. Install dependencies
3. Generate Prisma client
4. Run database migrations
5. Build Next.js app
6. Deploy to CDN

#### Step 5: Custom Domain (Optional)

1. Go to **Domain management**
2. Add your custom domain
3. Configure DNS as instructed
4. SSL certificate is automatic

#### Troubleshooting Deployment

If your Amplify deployment fails at the database connection step:
- Ensure your `DATABASE_URL` environment variable is fully qualified (e.g., ends in `/postgres?schema=public`).
- **Authentication Failed**: Verify the RDS Master Password in your AWS Console matches your `DATABASE_URL`. Even a small typo (like `FarmToGrocer2026`) requires an AWS Console modification to fix.
- **SSR Variables**: Amplify requires secrets to be explicitly written to `.env.production` during the build phase (already handled via our `amplify.yml` specification).

### Docker Deployment

#### Build & Run

```bash
# Build production image
docker build -t farm-to-grocer:latest .

# Run container
docker run -d -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="https://your-domain.com" \
  farm-to-grocer:latest
```

#### Docker Compose (Full Stack)

```bash
# Start all services (app, db, redis)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

#### Docker Services

| Service | Port | URL |
|---------|------|-----|
| App | 3000 | http://localhost:3000 |
| PostgreSQL | 5432 | localhost:5432 |
| Redis | 6379 | localhost:6379 |
| Prisma Studio | 5555 | http://localhost:5555 |
| PgAdmin | 5050 | http://localhost:5050 |
| MailHog | 8025 | http://localhost:8025 |

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Manual VPS Deployment

```bash
# 1. Clone repository
git clone https://github.com/your-org/farm-to-grocer.git
cd farm-to-grocer

# 2. Install dependencies
pnpm install

# 3. Build
pnpm build

# 4. Set up environment
cp .env.example .env.local
nano .env.local

# 5. Run migrations
pnpm db:push

# 6. Start with PM2
pm2 start pnpm --name "farm-to-grocer" -- start
pm2 save
```

---

## 📚 API Documentation

### Authentication

All authenticated endpoints require a valid session cookie.

### Products API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/products` | Public | List products with filters |
| `POST` | `/api/products` | Farmer | Create new product |
| `GET` | `/api/products/[id]` | Public | Get single product |
| `PUT` | `/api/products/[id]` | Farmer | Update product |
| `PATCH` | `/api/products/[id]` | Farmer | Partial update |
| `DELETE` | `/api/products/[id]` | Farmer | Delete product |

### Orders API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/orders` | Auth | List orders (role-filtered) |
| `POST` | `/api/orders` | Grocer | Create new order |
| `GET` | `/api/orders/[id]` | Auth | Get single order |
| `PUT` | `/api/orders/[id]` | Grocer | Update order |
| `PATCH` | `/api/orders/[id]` | Auth | Update status |
| `DELETE` | `/api/orders/[id]` | Grocer | Cancel order |

### System API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/health` | Public | Diagnostic endpoint reporting database connectivity, detailed memory metrics, API latency, and config readiness. Returns strict `503` if dependent services are down. |

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": { "field": ["error message"] }
  }
}
```

---

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `amplify.yml` | AWS Amplify build specification |
| `docker-compose.yml` | Docker services (app, db, redis) |
| `Dockerfile` | Multi-stage container build |
| `.env.example` | Environment variables template |
| `.eslintrc.json` | ESLint rules |
| `.gitignore` | Git ignore patterns |
| `.nvmrc` | Node.js version |
| `.prettierrc` | Code formatting |
| `middleware.ts` | Route protection |
| `next.config.js` | Next.js configuration |
| `postcss.config.js` | PostCSS plugins |
| `prisma/schema.prisma` | Database schema |
| `tailwind.config.ts` | Tailwind theme |
| `tsconfig.json` | TypeScript options |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test && npm run lint`
5. Commit: `git commit -m "feat: add amazing feature"`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Commit Convention

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting |
| `refactor` | Code restructuring |
| `test` | Adding tests |
| `chore` | Maintenance |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

- 📖 [Documentation](#-documentation)
- 💬 [GitHub Discussions](https://github.com/your-org/farm-to-grocer/discussions)
- 🐛 [Issue Tracker](https://github.com/your-org/farm-to-grocer/issues)
- 📧 Email: support@farmtogrocer.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [AWS Amplify](https://aws.amazon.com/amplify/) - Hosting Platform
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Radix UI](https://www.radix-ui.com/) - Accessible Components

---

<div align="center">

**Made with ❤️ by the Farm to Grocer Team**

[⬆ Back to Top](#-farm-to-grocer)

</div>
