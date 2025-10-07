# Admin Panel Setup Guide

## 🎯 Overview

Your portfolio now has a complete admin system with:
- ✅ Authentication (NextAuth.js)
- ✅ Database (MongoDB with Mongoose)
- ✅ CRUD API routes for Projects, Work Experience, and Services
- ✅ Admin Dashboard UI
- ✅ Protected routes (admin-only access)

## 📋 Prerequisites

1. **MongoDB** - Install MongoDB locally or use MongoDB Atlas (cloud)
   - Local: https://www.mongodb.com/try/download/community
   - Atlas (free): https://www.mongodb.com/cloud/atlas/register

## 🚀 Setup Steps

### 1. Create Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/portfolio
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/portfolio

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-key-here

# Admin Credentials (Change these!)
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

**Generate a secret key:**
```bash
openssl rand -base64 32
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start MongoDB

**If using local MongoDB:**
```bash
# Start MongoDB service
mongod
```

**If using MongoDB Atlas:**
- Create a cluster at https://cloud.mongodb.com
- Get your connection string
- Add it to `.env.local` as `MONGODB_URI`

### 4. Create Admin User

Run the script to create your admin account:

```bash
npx ts-node scripts/create-admin.ts
```

This will create an admin user with the credentials from your `.env.local` file.

### 5. Start the Development Server

```bash
npm run dev
```

## 🔐 Accessing the Admin Panel

1. **Login Page:** http://localhost:3000/admin/login
2. **Dashboard:** http://localhost:3000/admin/dashboard (after login)

Use the credentials you set in `.env.local`:
- Email: `ADMIN_EMAIL`
- Password: `ADMIN_PASSWORD`

## 📁 Admin Features

### Projects Management
- **List:** GET `/api/projects`
- **Create:** POST `/api/projects`
- **Update:** PUT `/api/projects/[id]`
- **Delete:** DELETE `/api/projects/[id]`
- **Admin UI:** `/admin/projects` (to be created)

### Work Experience Management
- **List:** GET `/api/work-experience`
- **Create:** POST `/api/work-experience`
- **Update:** PUT `/api/work-experience/[id]`
- **Delete:** DELETE `/api/work-experience/[id]`
- **Admin UI:** `/admin/work-experience` (to be created)

### Services Management
- **List:** GET `/api/services`
- **Create:** POST `/api/services`
- **Update:** PUT `/api/services/[id]`
- **Delete:** DELETE `/api/services/[id]`
- **Admin UI:** `/admin/services` (to be created)

## 🗂️ Database Models

### Project
```typescript
{
  title: string;
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  order: number;
}
```

### Work Experience
```typescript
{
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  order: number;
}
```

### Service
```typescript
{
  title: string;
  description: string;
  icon?: string;
  order: number;
}
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected API routes (admin-only)
- ✅ Session management
- ✅ Secure cookies

## 🎨 Next Steps

### To complete the admin panel, create:

1. **Projects Management Page** (`app/admin/projects/page.tsx`)
   - List all projects
   - Add/Edit/Delete forms
   - Image upload

2. **Work Experience Management Page** (`app/admin/work-experience/page.tsx`)
   - List all experiences
   - Add/Edit/Delete forms
   - Date pickers

3. **Services Management Page** (`app/admin/services/page.tsx`)
   - List all services
   - Add/Edit/Delete forms

4. **Update Frontend** to fetch data from database instead of hardcoded data

## 📝 Example API Usage

### Create a Project
```javascript
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My Project',
    description: 'A great project',
    technologies: ['React', 'Next.js'],
    featured: true,
    order: 1,
  }),
});
```

### Update a Project
```javascript
const response = await fetch(`/api/projects/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Updated Title',
  }),
});
```

### Delete a Project
```javascript
const response = await fetch(`/api/projects/${id}`, {
  method: 'DELETE',
});
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongod`
- Verify `MONGODB_URI` in `.env.local`
- For Atlas, check IP whitelist and credentials

### Authentication Error
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

### Admin User Not Created
- Check MongoDB connection
- Verify credentials in `.env.local`
- Run create-admin script again

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com/docs)

## 🎉 You're All Set!

Your admin system is ready. Log in and start managing your portfolio content dynamically!

