import { Module } from '@nestjs/common';

import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database';

@Module({
  imports: [ConfigurationModule, DatabaseModule],
})
export class AppModule {}
