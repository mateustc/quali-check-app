import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private buildUriPathParams(uri: string, pathParams?: any): string{
    let newUri = uri;
    for (const k in pathParams) {
      newUri = newUri.replace(`:${k}`, pathParams[k]);
    }
    return newUri;
  }

  private buildHttpParams(params?: any, reqOpts?: any): any {

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return reqOpts;
  }

  get(uri: string, params?: any, reqOpts?: any): Observable<any> {
    reqOpts = this.buildHttpParams(params, reqOpts);
    return this.http.get(uri, reqOpts);
  }

  getByFilter<T>(uri: string, filtros: any): Observable<T> {
    return this.http.get<T>(uri, {
      params: new HttpParams().set('filtros', this.filtrosToString(filtros))
    });
  }

  getUriParams<T>(uri: string, params: any): Observable<T> {
    return this.http.get<T>(this.buildUriPathParams(uri, params));
  }

  getById<T>(uri: string, id: string): Observable<T> {
    return this.http.get<T>(this.buildUriPathParams(uri, {id: id}));
  }

  post<T>(uri: string, data: any, params?: any): Observable<T> {
    return this.http.post<T>(this.buildUriPathParams(uri, params), data);
  }

  put<T>(uri: string, id: string, data: any): Observable<T> {
    return this.http.put<T>(this.buildUriPathParams(`${uri}/${id}`), data);
  }

  delete<T>(uri: string, id: string) {
    return this.http.delete<T>(this.buildUriPathParams(uri, {id: id}));
  }

  filtrosToString(filtrosDTO: any): string {
    return JSON.stringify(filtrosDTO);
  }
}
