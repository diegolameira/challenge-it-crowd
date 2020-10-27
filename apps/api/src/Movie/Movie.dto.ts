import { IsInt, IsString, IsDate } from 'class-validator';
import { Movie } from './Movie.entity';

export class CreateMovieDto extends Movie {
  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsInt()
  readonly releaseYear: number;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;
}
