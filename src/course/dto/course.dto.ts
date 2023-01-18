//###########################################################################################
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
//###########################################################################################

//###########################################################################################
export class CourseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly teacher: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly beginDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly finishDate: Date;
}
//###########################################################################################
