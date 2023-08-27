import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import { FirebaseApp } from './infrastructure/config/firebase/firebase-app.service';
import { PreAuthMiddleware } from './infrastructure/common/middleware/pre-auth.middleware';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    RepositoriesModule,
    ControllersModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (configService: EnvironmentConfigService) => ({
        uri: `mongodb+srv://${configService.getDatabaseUser()}:${configService.getDatabasePassword()}@cluster0.krrcryq.mongodb.net/${configService.getDatabaseName()}`,
      }),
      inject: [EnvironmentConfigService],
    }),
  ],
  providers: [FirebaseApp],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): any {
  //   consumer.apply(PreAuthMiddleware).exclude({ path: 'users', method: RequestMethod.GET }).forRoutes('*');
  // }
}
