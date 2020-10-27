import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovieController } from './Movie.controller';
import { MovieRepository } from './Movie.repository';
import { MovieService } from './Movie.service';
import { movieProviders } from './Movie.providers';
import { DatabaseModule } from 'src/database';
import { Movie } from './Movie.entity';
import { Person } from 'src/Person/Person.entity';

@Module({
  imports: [
    // ConfigModule,
    // DatabaseModule,
    TypeOrmModule.forFeature([Movie, Person]),
  ],
  providers: [
    // MovieRepository,
    MovieService,
  ],
  controllers: [MovieController],
  exports: [MovieService, TypeOrmModule],
})
export class MovieModule {}
