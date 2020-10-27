import { ConfigService } from '@nestjs/config';
// import { Movie } from 'src/Movie/Movie.entity';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return await createConnection({
        type: configService.get('DATABASE_TYPE'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DBNAME'),
        entities: [
          // Movie,
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });
    },
  },
];
