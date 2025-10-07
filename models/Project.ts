import mongoose from 'mongoose';

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new mongoose.Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    image: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    technologies: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
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

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

