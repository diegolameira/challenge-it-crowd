import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/Movie/Movie.entity';
import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 500 })
  firstName: string;

  @Column({ nullable: false, type: 'varchar', length: 500 })
  lastName: string;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  aliases: string;

  @ManyToMany(
    type => Movie,
    movie => movie.asCasting,
    { cascade: true },
  )
  @JoinTable({
    name: 'asCasting_movie',
    joinColumns: [{ name: 'personId' }],
    inverseJoinColumns: [{ name: 'movieId' }],
  })
  asCasting: Movie[];

  @ManyToMany(
    type => Movie,
    movie => movie.asDirector,
    { cascade: true },
  )
  @JoinTable({
    name: 'asDirector_movie',
    joinColumns: [{ name: 'personId' }],
    inverseJoinColumns: [{ name: 'movieId' }],
  })
  asDirector: Movie[];

  @ManyToMany(
    type => Movie,
    movie => movie.asProducer,
    { cascade: true },
  )
  @JoinTable({
    name: 'asProducer_movie',
    joinColumns: [{ name: 'personId' }],
    inverseJoinColumns: [{ name: 'movieId' }],
  })
  asProducer: Movie[];

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
