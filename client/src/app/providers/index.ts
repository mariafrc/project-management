import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';

export const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true,
  },
];
