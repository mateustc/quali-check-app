import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from 'components/components.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from '../environments/environment';
import { GlobalErrorHandler } from 'shared/error/error-handler';
import { ServerErrorInterceptor } from 'shared/error/error.interceptor';
import { HttpRequestInterceptor } from 'shared/http/http-request-interceptor';
import { SharedModule } from 'shared/shared.module';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(), 
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__quali-check',
      storeName: 'storage'
    }),
    ComponentsModule,
    SharedModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireMessagingModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production })
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
