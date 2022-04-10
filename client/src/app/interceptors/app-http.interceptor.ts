import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseURL="http://localhost:3000/api";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
	/* eslint @typescript-eslint/no-explicit-any: "off" */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
		req = req.clone({
			url: baseURL + req.url,
			headers: req.headers.set('Content-Type', 'application/json')
		});

		const token = localStorage.getItem('token');
		if(token){
			req = req.clone({headers: req.headers.append('Authorization', 'Bearer ' + token )});
		}
		return next.handle(req);
	}
}