import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Config } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '../../../.envrc.production',
        '../../../.envrc.development.local',
        '../../../.envrc.development',
        '../../../.envrc',
      ],
      load: [Config],
      isGlobal: true,
    }),
  ],
})
export class ConfigurationModule {}
