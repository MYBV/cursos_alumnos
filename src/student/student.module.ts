//###########################################################################################
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { STUDENT } from 'src/common/models/models';
import { StudentSchema } from './schema/student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
//###########################################################################################

//###########################################################################################
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: STUDENT.name,
        useFactory: () => StudentSchema,
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
//###########################################################################################

//###########################################################################################
export class StudentModule {}
//###########################################################################################
