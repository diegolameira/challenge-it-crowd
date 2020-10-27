import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './Movie.entity';

@Injectable()
@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}
