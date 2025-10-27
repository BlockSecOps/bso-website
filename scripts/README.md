# BlockSecOps Website - Installation Scripts

This directory contains scripts to help you set up and maintain the BlockSecOps website.

---

## Available Scripts

### `install-dependencies.sh`

Installs all dependencies needed to run the complete BlockSecOps website including:
- Landing page
- Documentation system (Payload CMS)
- Wiki system (Payload CMS)
- API Reference (Scalar)

**Usage:**

```bash
# From the project root directory
./scripts/install-dependencies.sh
```

**What it does:**

1. ✓ Checks Node.js and npm versions
2. ✓ Cleans previous installations
3. ✓ Installs core Next.js dependencies
4. ✓ Installs Payload CMS for docs & wiki
5. ✓ Installs Scalar for API documentation
6. ✓ Installs additional utilities (MongoDB, syntax highlighting, etc.)
7. ✓ Verifies all packages are installed correctly

**Requirements:**

- Node.js 18 or higher
- npm 8 or higher

**Output:**

The script provides colored output:
- ✓ Green: Success
- ℹ Blue: Information
- ⚠ Yellow: Warning
- ✗ Red: Error

---

## After Installation

Once the installation is complete, you'll need to:

### 1. Set up Environment Variables

Create `.env.local` in the project root:

```env
# Payload CMS Configuration
PAYLOAD_SECRET=your-secret-key-minimum-32-characters
DATABASE_URI=mongodb://localhost:27017/blocksecops
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional: MongoDB Atlas (recommended for production)
# DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/blocksecops
```

### 2. Set up MongoDB

**Option A: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Add it to `.env.local` as `DATABASE_URI`

**Option B: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Access the Site

- **Landing Page**: http://localhost:3000
- **API Reference**: http://localhost:3000/api/reference
- **Admin Portal**: http://localhost:3000/admin (after first setup)
- **Docs**: http://localhost:3000/docs (after creating content)
- **Wiki**: http://localhost:3000/wiki (after creating content)

---

## Troubleshooting

### Permission Denied Error

If you get a permission error when running the script:

```bash
chmod +x scripts/install-dependencies.sh
./scripts/install-dependencies.sh
```

### npm Install Failures

If some packages fail to install, try:

```bash
npm install --legacy-peer-deps
```

### Port Already in Use

If port 3000 is already in use:

```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=4001 npm run dev
```

### MongoDB Connection Issues

Make sure MongoDB is running:

```bash
# Check if MongoDB is running
mongosh --eval "db.version()"

# Start MongoDB (if using local)
brew services start mongodb-community
```

---

## Additional Resources

- **Payload CMS Setup**: See `docs/17-PAYLOAD-CMS-IMPLEMENTATION-PLAN.md`
- **API Documentation**: See `docs/13-API-DOCUMENTATION-GUIDE.md`
- **Content Management**: See `docs/16-SIMPLE-CONTENT-GUIDE.md`

---

## Support

If you encounter any issues:

1. Check the documentation in the `docs/` folder
2. Verify all environment variables are set correctly
3. Make sure MongoDB is running
4. Check that all ports are available

---

## Next Steps After Installation

1. **Configure Payload CMS** - Follow the implementation plan
2. **Create Collections** - Set up Docs and Wiki collections
3. **Add Content** - Use the admin portal to create pages
4. **Customize Styling** - Match your brand design
5. **Deploy** - Push to your production server

---

**Last Updated**: 2025-01-21
