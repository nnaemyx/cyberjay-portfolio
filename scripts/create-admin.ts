import { config } from 'dotenv';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function createAdmin() {
  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Missing required environment variables: MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD');
    process.exit(1);
  }

  const mongoUri = MONGODB_URI as string;
  const adminEmail = ADMIN_EMAIL as string;
  const adminPassword = ADMIN_PASSWORD as string;

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const UserSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      role: String,
    });

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully:', admin.email);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();

