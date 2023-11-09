

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { B2bHeaderModule } from 'b2b-header';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWTInterceptor } from './projects/interceptor/general-interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    B2bHeaderModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor, 
      multi: true, 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
