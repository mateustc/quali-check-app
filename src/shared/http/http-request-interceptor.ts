import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { CFG } from 'config/cfg';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.isSecurityUrl(request.url)) {
            const autenticacao = this.authService.getAuth();

            if (autenticacao && autenticacao.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${autenticacao.token}`
                    }
                });
            }
        }

        return next.handle(request);
    }

    isSecurityUrl(url: string): boolean{
        return url.indexOf(CFG.base_uri) !== -1;
    }

}
