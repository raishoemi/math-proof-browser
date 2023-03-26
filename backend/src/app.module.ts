import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProofsModule } from './proofs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'proofs',
      username: 'root',
      password: 'Password1!',
      host: 'localhost',
      port: 3306,
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProofsModule,
  ],
})
export class AppModule {}
