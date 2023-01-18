//###########################################################################################
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE } from 'src/common/models/models';
import { StudentModule } from 'src/student/student.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseSchema } from './schema/course.schema';
//###########################################################################################

//###########################################################################################
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: COURSE.name,
        useFactory: () => CourseSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    StudentModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
//###########################################################################################

//###########################################################################################
export class CourseModule {}
//###########################################################################################
