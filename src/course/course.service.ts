//###########################################################################################
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICourse } from 'src/common/interfaces/course.interface';
import { COURSE } from 'src/common/models/models';
import { CourseDTO } from './dto/course.dto';
//###########################################################################################

//###########################################################################################
@Injectable()
//###########################################################################################
export class CourseService {
  constructor(
    @InjectModel(COURSE.name) private readonly model: Model<ICourse>,
  ) {}

  async create(courseDTO: CourseDTO): Promise<ICourse> {
    let newCourse = new this.model(courseDTO);
    return await newCourse.save();
  }

  async findAll(): Promise<ICourse[]> {
    return this.model.find().populate('students');
  }

  async findOne(id: string): Promise<ICourse> {
    return this.model.findById(id).populate('students');
  }

  async update(id: string, courseDTO: CourseDTO): Promise<ICourse> {
    return this.model.findByIdAndUpdate(id, courseDTO);
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Course deleted',
    };
  }

  async addStudent(courseId: string, studentId: string): Promise<ICourse> {
    return await this.model
      .findByIdAndUpdate(
        courseId,
        {
          $addToSet: { students: studentId },
        },
        { new: true },
      )
      .populate('students');
  }
}
//###########################################################################################
