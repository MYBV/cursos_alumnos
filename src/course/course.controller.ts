//###########################################################################################
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { StudentService } from '../student/student.service';
import { CourseService } from './course.service';
import { CourseDTO } from './dto/course.dto';
//###########################################################################################

//###########################################################################################
@ApiTags('Courses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/course')
//###########################################################################################
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly studentService: StudentService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Create Course' })
  create(@Body() courseDTO: CourseDTO) {
    return this.courseService.create(courseDTO);
  }

  @Get()
  @ApiOperation({ summary: 'List Courses' })
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get info Course' })
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Course' })
  update(@Param('id') id: string, @Body() courseDTO: CourseDTO) {
    return this.courseService.update(id, courseDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Course' })
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }

  @Post(':courseId/student/:studentId')
  @ApiOperation({ summary: 'Add Student at Course' })
  async addStudent(
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string,
  ) {
    let student = await this.studentService.findOne(studentId);
    if (!student)
      throw new HttpException('Student Not Found', HttpStatus.NOT_FOUND);

    let course = await this.courseService.findOne(courseId);
    if (!course)
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);

    return this.courseService.addStudent(courseId, studentId);
  }
}
//###########################################################################################
