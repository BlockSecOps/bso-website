#!/bin/bash

# BlockSecOps Website - Complete Dependency Installation Script
# This script installs all dependencies needed for:
# - Landing page
# - Docs (Payload CMS)
# - Wiki (Payload CMS)
# - API Reference (Scalar)

set -e  # Exit on any error

echo "=========================================="
echo "BlockSecOps Website - Dependency Installer"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_section() {
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

print_success "Found package.json - proceeding with installation"

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi
print_success "Node.js version check passed: $(node -v)"

# Check npm version
NPM_VERSION=$(npm -v)
print_success "npm version: $NPM_VERSION"

print_section "Step 1: Clean Install"
print_info "Removing node_modules and package-lock.json for clean install..."
rm -rf node_modules package-lock.json .next

print_section "Step 2: Installing Core Dependencies"
print_info "Installing Next.js, React, and base dependencies..."

npm install

print_success "Core dependencies installed"

print_section "Step 3: Installing Payload CMS (Docs & Wiki)"
print_info "Installing Payload CMS packages..."

npm install payload \
    @payloadcms/db-mongodb \
    @payloadcms/richtext-lexical \
    @payloadcms/plugin-cloud-storage \
    @payloadcms/plugin-seo

npm install --save-dev @payloadcms/next

print_success "Payload CMS packages installed"

print_section "Step 4: Installing API Reference (Scalar)"
print_info "Installing Scalar API documentation..."

npm install @scalar/nextjs-api-reference

print_success "Scalar API Reference installed"

print_section "Step 5: Installing Additional Dependencies"
print_info "Installing utilities and enhancements..."

# Database driver for MongoDB
npm install mongodb

# Rich text rendering
npm install @payloadcms/richtext-slate

# Image optimization (if not already installed)
npm install sharp

# Code syntax highlighting for docs/wiki
npm install shiki prism-react-renderer

# Additional utilities
npm install clsx tailwind-merge

print_success "Additional dependencies installed"

print_section "Step 6: Verifying Installation"
print_info "Checking installed packages..."

PACKAGES_TO_CHECK=(
    "next"
    "react"
    "payload"
    "@payloadcms/db-mongodb"
    "@payloadcms/richtext-lexical"
    "@scalar/nextjs-api-reference"
    "mongodb"
)

ALL_INSTALLED=true
for package in "${PACKAGES_TO_CHECK[@]}"; do
    if npm list "$package" > /dev/null 2>&1; then
        print_success "$package is installed"
    else
        print_error "$package is NOT installed"
        ALL_INSTALLED=false
    fi
done

echo ""

if [ "$ALL_INSTALLED" = true ]; then
    print_section "Installation Complete!"
    echo ""
    print_success "All dependencies installed successfully!"
    echo ""
    print_info "Next Steps:"
    echo "  1. Set up environment variables in .env.local"
    echo "  2. Configure MongoDB connection"
    echo "  3. Run 'npm run dev' to start the development server"
    echo ""
    print_info "For detailed setup instructions, see:"
    echo "  - docs/17-PAYLOAD-CMS-IMPLEMENTATION-PLAN.md"
    echo "  - docs/13-API-DOCUMENTATION-GUIDE.md"
    echo ""

    print_section "Quick Start"
    echo ""
    echo "To start development:"
    echo "  npm run dev"
    echo ""
    echo "To access:"
    echo "  • Landing Page:   http://localhost:3000"
    echo "  • API Reference:  http://localhost:3000/api/reference"
    echo "  • Admin Portal:   http://localhost:3000/admin (after Payload setup)"
    echo ""

    exit 0
else
    print_section "Installation Issues Detected"
    print_error "Some packages failed to install. Please check the errors above."
    echo ""
    print_info "Try running:"
    echo "  npm install --legacy-peer-deps"
    echo ""
    exit 1
fi
