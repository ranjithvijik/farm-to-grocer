# ═══════════════════════════════════════════════════════════════
# FARM-TO-GROCER MVP - DOCKERFILE
# ═══════════════════════════════════════════════════════════════
#
# Multi-stage Dockerfile for Next.js 14 with:
# - Optimized production builds
# - Minimal final image size (~150MB)
# - Non-root user for security
# - Prisma client generation
# - Health check endpoint
#
# Build:   docker build -t farm-to-grocer:latest .
# Run:     docker run -p 3000:3000 farm-to-grocer:latest
#
# ═══════════════════════════════════════════════════════════════


# ───────────────────────────────────────────────────────────────
# STAGE 1: BASE IMAGE
# ───────────────────────────────────────────────────────────────
# Sets up the base Node.js environment with common dependencies

FROM node:20.11.1-alpine AS base

# Install dependencies required for Prisma and other native modules
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    openssl-dev

# Set working directory
WORKDIR /app

# Enable corepack for pnpm (optional - uncomment if using pnpm)
# RUN corepack enable && corepack prepare pnpm@latest --activate


# ───────────────────────────────────────────────────────────────
# STAGE 2: DEPENDENCIES
# ───────────────────────────────────────────────────────────────
# Installs all dependencies (including devDependencies for build)

FROM base AS deps

# Copy package files
COPY package.json package-lock.json* ./

# Copy Prisma schema (needed for prisma generate)
COPY prisma ./prisma/

# Install dependencies
# Using --frozen-lockfile for reproducible builds
RUN npm ci

# Generate Prisma client
RUN npx prisma generate


# ───────────────────────────────────────────────────────────────
# STAGE 3: BUILDER
# ───────────────────────────────────────────────────────────────
# Builds the Next.js application

FROM base AS builder

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Set build-time environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build arguments for environment variables
# These can be passed during docker build
ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

# Set environment variables for build
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

# Generate Prisma client (in case schema changed)
RUN npx prisma generate

# Build the Next.js application
# Output: standalone mode for minimal production image
RUN npm run build


# ───────────────────────────────────────────────────────────────
# STAGE 4: PRODUCTION RUNNER
# ───────────────────────────────────────────────────────────────
# Minimal production image with only necessary files

FROM node:20.11.1-alpine AS runner

# Install runtime dependencies
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    curl \
    dumb-init

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Create necessary directories
RUN mkdir -p /app/.next/cache && \
    chown -R nextjs:nodejs /app

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone build output
# The standalone output includes only necessary files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma files for runtime
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set the port environment variable
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]


# ═══════════════════════════════════════════════════════════════
# DEVELOPMENT STAGE (Optional)
# ═══════════════════════════════════════════════════════════════
# Use this stage for local development with hot reloading

FROM base AS development

# Set development environment
ENV NODE_ENV=development

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy all source files
COPY . .

# Expose port
EXPOSE 3000

# Start development server with hot reloading
CMD ["npm", "run", "dev"]


# ═══════════════════════════════════════════════════════════════
# USAGE INSTRUCTIONS
# ═══════════════════════════════════════════════════════════════
#
# BUILD PRODUCTION IMAGE:
# -----------------------
# docker build -t farm-to-grocer:latest .
#
# BUILD WITH ENVIRONMENT VARIABLES:
# ---------------------------------
# docker build \
#   --build-arg DATABASE_URL="postgresql://..." \
#   --build-arg NEXTAUTH_SECRET="your-secret" \
#   --build-arg NEXTAUTH_URL="https://your-domain.com" \
#   -t farm-to-grocer:latest .
#
# RUN PRODUCTION CONTAINER:
# -------------------------
# docker run -d \
#   -p 3000:3000 \
#   -e DATABASE_URL="postgresql://..." \
#   -e NEXTAUTH_SECRET="your-secret" \
#   -e NEXTAUTH_URL="https://your-domain.com" \
#   --name farm-to-grocer \
#   farm-to-grocer:latest
#
# BUILD DEVELOPMENT IMAGE:
# ------------------------
# docker build --target development -t farm-to-grocer:dev .
#
# RUN DEVELOPMENT CONTAINER:
# --------------------------
# docker run -d \
#   -p 3000:3000 \
#   -v $(pwd):/app \
#   -v /app/node_modules \
#   --name farm-to-grocer-dev \
#   farm-to-grocer:dev
#
# VIEW LOGS:
# ----------
# docker logs -f farm-to-grocer
#
# SHELL ACCESS:
# -------------
# docker exec -it farm-to-grocer sh
#
# STOP & REMOVE:
# --------------
# docker stop farm-to-grocer && docker rm farm-to-grocer
#
# ═══════════════════════════════════════════════════════════════
