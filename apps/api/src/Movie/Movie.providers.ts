import { Connection } from 'typeorm';

import { Movie } from './Movie.entity';

export const movieProviders = [
  {
    provide: 'MOVIE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Movie),
    inject: ['DATABASE_CONNECTION'],
  },
];
