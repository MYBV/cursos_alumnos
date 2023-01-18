//###########################################################################################
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { StudentDTO } from './dto/student.dto';
import { StudentService } from './student.service';
//###########################################################################################

//###########################################################################################
@ApiTags('Students')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/student')
//###########################################################################################
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post()
  @ApiOperation({ summary: 'Create Student' })
  create(@Body() studentDTO: StudentDTO) {
    return this.studentService.create(studentDTO);
  }

  @Get()
  @ApiOperation({ summary: 'List Students' })
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get info Student' })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Student' })
  update(@Param('id') id: string, @Body() studentDTO: StudentDTO) {
    return this.studentService.update(id, studentDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Student' })
  delete(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
}
//###########################################################################################
