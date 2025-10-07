import mongoose from 'mongoose';

export interface IWorkExperience {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const WorkExperienceSchema = new mongoose.Schema<IWorkExperience>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      maxlength: [100, 'Company name cannot be more than 100 characters'],
    },
    location: {
      type: String,
      maxlength: [100, 'Location cannot be more than 100 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date'],
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
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

export default mongoose.models.WorkExperience || mongoose.model<IWorkExperience>('WorkExperience', WorkExperienceSchema);

