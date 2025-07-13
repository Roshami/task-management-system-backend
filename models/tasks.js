import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    created_by: {
      type: String,
      required: true,
    },
    assigned_to: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      default: 'Personal',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    subtasks: {
      type: [
        {
        subtasks_title: {
          type: String,
          required: true,
        },
        subtasks_description: {
          type: String,
          required: true,
        },
        subtasks_status: {
          type: String,
          required: true,
          default: 'Pending',
        },
      }
      ],
      default: [],
      timestamps: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model('Tasks', taskSchema);

export default Tasks;
