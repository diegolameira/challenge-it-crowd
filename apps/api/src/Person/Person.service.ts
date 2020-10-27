import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';

import { MovieRepository } from 'src/Movie/Movie.repository';

import { CreatePersonDto } from './Person.dto';
import { Person } from './Person.entity';
import { PersonRepository } from './Person.repository';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonRepository)
    private readonly personRepository: PersonRepository,
    @InjectRepository(MovieRepository)
    private readonly movieRepository: MovieRepository,
  ) {}

  async create(createPersonDTO: CreatePersonDto): Promise<Person> {
    const asCasting = await this.movieRepository.findByIds(
      createPersonDTO.asCasting || [],
    );
    const asDirector = await this.movieRepository.findByIds(
      createPersonDTO.asDirector || [],
    );
    const asProducer = await this.movieRepository.findByIds(
      createPersonDTO.asProducer || [],
    );

    const person = new Person();
    person.firstName = createPersonDTO.firstName;
    person.lastName = createPersonDTO.lastName;

    return await this.personRepository.save({
      ...person,
      asCasting,
      asDirector,
      asProducer,
    });
  }

  async findOne(id: string): Promise<Person | undefined> {
    return await this.personRepository.findOne(id, {
      relations: ['asCasting', 'asDirector', 'asProducer'],
    });
  }

  async update(
    id: string,
    updatePersonDTO: CreatePersonDto,
  ): Promise<UpdateResult> {
    return await this.personRepository.update(id, updatePersonDTO);
  }

  async delete(id: string, force?: boolean): Promise<DeleteResult> {
    if (force) {
      return await this.personRepository.delete([id]);
    }
    return await this.personRepository.softDelete([id]);
  }

  async remove(people: Person[], force: boolean): Promise<Person[]> {
    if (force) {
      return await this.personRepository.remove(people);
    }
    return await this.personRepository.softRemove(people);
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({
      relations: ['asCasting', 'asDirector', 'asProducer'],
    });
  }
}
