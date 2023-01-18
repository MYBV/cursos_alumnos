//###########################################################################################
import * as mongoose from 'mongoose';
//###########################################################################################

//###########################################################################################
export const CourseSchema = new mongoose.Schema(
  {
    descripcion: { type: String, require: true },
    teacher: { type: String, require: true },
    beginDate: { type: Date, require: true },
    finishDate: { type: Date, require: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }],
  },
  { timestamps: true },
);
//###########################################################################################
