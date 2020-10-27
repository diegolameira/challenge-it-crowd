import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonRepository } from 'src/Person/Person.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateMovieDto } from './Movie.dto';
import { Movie } from './Movie.entity';
import { MovieRepository } from './Movie.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieRepository)
    private readonly movieRepository: MovieRepository,
    @InjectRepository(PersonRepository)
    private readonly personRepository: PersonRepository,
  ) {}

  async create(createMovieDTO: CreateMovieDto): Promise<Movie> {
    const movie = new Movie();
    movie.title = createMovieDTO.title;
    movie.releaseYear = createMovieDTO.releaseYear;
    return await this.movieRepository.save(movie);
  }

  async findOne(id: string): Promise<Movie | undefined> {
    const movie = await this.movieRepository.findOne(id, {
      relations: ['asCasting', 'asDirector', 'asProducer'],
    });
    // if (movie)
    //   movie.romanReleaseYear = Intl.NumberFormat('roman').format(movie?.releaseYear)
    return movie;
  }

  async update(
    id: string,
    updateMovieDTO: CreateMovieDto,
  ): Promise<UpdateResult> {
    return await this.movieRepository.update(id, updateMovieDTO);
  }

  async delete(id: string, force?: boolean): Promise<DeleteResult> {
    if (force) {
      return await this.movieRepository.delete(id);
    }
    return await this.movieRepository.softDelete(id);
  }

  async remove(movies: Movie[], force: boolean): Promise<Movie[]> {
    if (force) {
      return await this.movieRepository.remove(movies);
    }
    return await this.movieRepository.softRemove(movies);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find({
      relations: ['asCasting', 'asDirector', 'asProducer'],
    });
  }
}
