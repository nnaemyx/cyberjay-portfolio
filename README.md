# CyberJay Portfolio

A modern, responsive portfolio website with a complete admin panel for content management.

## Features

- 🎨 **Modern Design** - Clean, responsive UI with dark theme
- 📱 **Mobile-First** - Fully responsive across all devices
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized
- 🎬 **Smooth Animations** - Scroll-triggered animations and transitions
- 🔐 **Admin Panel** - Complete CRUD system for content management
- 🗄️ **Database** - MongoDB with Mongoose for data persistence
- 🔒 **Authentication** - Secure admin login with NextAuth.js

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (recommended)

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd cyberjay-portfolio
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

### 3. Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env.local`

### 4. Create Admin User

```bash
npm run create-admin
```

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Admin Panel

Access the admin panel at: http://localhost:3000/admin/login

### Features:
- **Dashboard** - Overview of all content
- **Projects** - Add/edit/delete portfolio projects
- **Work Experience** - Manage work history
- **Services** - Update services offered

### Admin Credentials:
Use the email and password you set in `.env.local`

## Project Structure

```
├── app/
│   ├── admin/                 # Admin panel pages
│   │   ├── dashboard/         # Main dashboard
│   │   ├── projects/          # Project management
│   │   ├── work-experience/   # Experience management
│   │   └── services/          # Service management
│   ├── api/                   # API routes
│   │   ├── auth/              # Authentication
│   │   ├── projects/          # Project CRUD
│   │   ├── work-experience/   # Experience CRUD
│   │   └── services/          # Service CRUD
│   ├── components/            # Reusable components
│   └── page.tsx              # Main portfolio page
├── lib/                      # Utilities
├── models/                   # Database models
├── types/                    # TypeScript types
└── scripts/                  # Setup scripts
```

## API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/[id]` - Update project (admin only)
- `DELETE /api/projects/[id]` - Delete project (admin only)

### Work Experience
- `GET /api/work-experience` - List all experiences
- `POST /api/work-experience` - Create experience (admin only)
- `PUT /api/work-experience/[id]` - Update experience (admin only)
- `DELETE /api/work-experience/[id]` - Delete experience (admin only)

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/[id]` - Update service (admin only)
- `DELETE /api/services/[id]` - Delete service (admin only)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-secure-password
```

## Customization

### Colors
Update `app/globals.css` to change the color scheme:
```css
:root {
  --primary: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  /* ... */
}
```

### Fonts
The site uses General Sans from CDN. To change:
1. Update the font link in `app/layout.tsx`
2. Update `--font-sans` in `app/globals.css`

### Content
All content is managed through the admin panel. No code changes needed!

## Security

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected API routes
- ✅ Secure session management
- ✅ Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for your own portfolio!

## Support

If you encounter any issues:
1. Check the console for errors
2. Verify environment variables
3. Ensure MongoDB is running
4. Check the admin setup guide in `ADMIN_SETUP.md`

---

Built with ❤️ by CyberJay