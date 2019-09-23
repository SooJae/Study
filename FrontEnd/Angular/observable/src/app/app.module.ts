import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventEmitterComponent } from './event-emitter/event-emitter.component';
import { AppChildComponent } from './appchild/appchild.component';

@NgModule({
  declarations: [
    AppComponent,
    EventEmitterComponent,
    AppChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
