import { Module } from '@nestjs/common';

import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database';
import { MovieModule } from './Movie';

@Module({
  imports: [ConfigurationModule, DatabaseModule, MovieModule],
})
export class AppModule {}
