//###########################################################################################
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from 'src/common/interfaces/student.interface';
import { STUDENT } from 'src/common/models/models';
import { StudentDTO } from './dto/student.dto';
//###########################################################################################

//###########################################################################################
@Injectable()
//###########################################################################################
export class StudentService {
  constructor(
    @InjectModel(STUDENT.name) private readonly model: Model<IStudent>,
  ) {}
  async create(studentDTO: StudentDTO): Promise<IStudent> {
    let newStudent = new this.model(studentDTO);
    return await newStudent.save();
  }

  async findAll(): Promise<IStudent[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IStudent> {
    return await this.model.findById(id);
  }

  async update(id: string, studentDTO: StudentDTO): Promise<IStudent> {
    return await this.model.findByIdAndUpdate(id, studentDTO);
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Student Deleted',
    };
  }
}
//###########################################################################################
