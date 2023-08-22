import { Module } from '@nestjs/common';

import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/teams'),
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    RepositoriesModule,
    ControllersModule,
  ],
})
export class AppModule {}
