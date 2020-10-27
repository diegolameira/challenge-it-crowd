import { EntityRepository, Repository } from 'typeorm';
import { Person } from './Person.entity';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {}
