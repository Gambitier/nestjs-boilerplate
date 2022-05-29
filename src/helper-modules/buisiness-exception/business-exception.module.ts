import { Module, DynamicModule } from '@nestjs/common';
import { ExceptionInterceptor } from './interceptors/ExceptionInterceptor';
import { BUSINESS_EXCEPTION_INTERCEPTOR_TOKEN } from './constants';
import { BusinessExceptionConfig } from './interfaces/business-exception.config';
import { BusinessExceptionConfigAsync } from './interfaces/business-exception.config.async';
import { BusinessExceptionHostModule } from './business-exception-host.module';

@Module({
  providers: [
    {
      provide: ExceptionInterceptor,
      useExisting: BUSINESS_EXCEPTION_INTERCEPTOR_TOKEN,
    },
  ],
  exports: [ExceptionInterceptor],
})
export class BusinessExceptionModule {
  static forRoot(config: BusinessExceptionConfig): DynamicModule {
    return {
      module: BusinessExceptionModule,
      imports: [BusinessExceptionHostModule.forRoot(config)],
    };
  }

  static forRootAsync(config: BusinessExceptionConfigAsync): DynamicModule {
    return {
      module: BusinessExceptionModule,
      imports: [BusinessExceptionHostModule.forRootAsync(config)],
    };
  }
}
