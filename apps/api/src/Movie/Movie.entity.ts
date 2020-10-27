import { ApiProperty } from '@nestjs/swagger';
import { Person } from 'src/Person/Person.entity';
import { numberToRomanNumberals } from 'src/utils';
import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  AfterLoad,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Titanic', description: 'Movie`s title' })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  title: string;

  @ApiProperty({ example: 1998, description: 'Movie`s release year' })
  @Column({ nullable: false, type: 'int' })
  releaseYear: number;

  @ApiProperty({
    example: 'MMXVII',
    description: 'Movie`s release year in roman numerals',
  })
  protected romanReleaseYear: string;

  @AfterLoad()
  protected setRomanReleaseYear = async () => {
    this.romanReleaseYear = numberToRomanNumberals(this.releaseYear) || '';
  };

  @ManyToMany(
    type => Person,
    person => person.asCasting,
  )
  // @JoinTable()
  asCasting: Person[];

  @ManyToMany(
    type => Person,
    person => person.asDirector,
  )
  // @JoinTable()
  asDirector: Person[];

  @ManyToMany(
    type => Person,
    person => person.asProducer,
  )
  // @JoinTable()
  asProducer: Person[];

  @ApiProperty({
    example: '1998-01-16T02:00:00.000Z',
    description: 'Database insert date',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '1998-01-16T02:00:00.000Z',
    description: 'Last update date',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '1998-01-16T02:00:00.000Z',
    description: 'Soft deleted date',
  })
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
