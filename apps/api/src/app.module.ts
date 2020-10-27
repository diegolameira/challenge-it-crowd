import { Module } from '@nestjs/common';

import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database';
import { MovieModule } from './Movie';
import { PersonModule } from './Person';

@Module({
  imports: [ConfigurationModule, DatabaseModule, MovieModule, PersonModule],
})
export class AppModule {}
