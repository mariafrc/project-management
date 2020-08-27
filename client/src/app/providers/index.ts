import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

import { UserService } from './services/user/user.service';
import { DialogService } from './services/dialog/dialog.service';

export const providers = [
	{
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  },
	
	AuthGuard,
	AdminGuard,
	UserGuard,
	
	UserService,
	DialogService
];