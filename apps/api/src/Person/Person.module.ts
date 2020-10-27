import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonController } from './Person.controller';
import { PersonRepository } from './Person.repository';
import { DatabaseModule } from 'src/database';
import { PersonService } from './Person.service';
import { Person } from './Person.entity';
import { Movie } from 'src/Movie/Movie.entity';

@Module({
  imports: [
    // ConfigModule,
    // DatabaseModule,
    TypeOrmModule.forFeature([Person, Movie]),
  ],
  providers: [
    // PersonRepository,
    PersonService,
  ],
  controllers: [PersonController],
  exports: [PersonService, TypeOrmModule],
})
export class PersonModule {}
