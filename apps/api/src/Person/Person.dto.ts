import { IsInt, IsString, IsDate, IsArray } from 'class-validator';
import { Movie } from 'src/Movie/Movie.entity';
import { Person } from './Person.entity';

export class CreatePersonDto extends Person {
  @IsString()
  readonly id: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly aliases: string;

  @IsArray()
  readonly asCasting: Movie[];

  @IsArray()
  readonly asDirector: Movie[];

  @IsArray()
  readonly asProducer: Movie[];

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;
}
