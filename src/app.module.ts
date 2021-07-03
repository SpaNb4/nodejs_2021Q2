import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsersModule,
        TasksModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
