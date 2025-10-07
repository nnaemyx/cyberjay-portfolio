import mongoose from 'mongoose';

export interface IService {
  _id?: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceSchema = new mongoose.Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a service title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    icon: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

