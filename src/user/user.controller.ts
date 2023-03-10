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
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
//###########################################################################################

//###########################################################################################
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/user')
//###########################################################################################
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ summary: 'Create User' })
  create(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Get()
  @ApiOperation({ summary: 'List Users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get info User' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  update(@Param('id') id: string, @Body() userDto: UserDTO) {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
//###########################################################################################
