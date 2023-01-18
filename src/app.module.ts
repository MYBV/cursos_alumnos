//###########################################################################################
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
//###########################################################################################

//###########################################################################################
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    UserModule,
    StudentModule,
    CourseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
//###########################################################################################

//###########################################################################################
export class AppModule {}
//###########################################################################################
