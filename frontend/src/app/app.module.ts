import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './components/data/data.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { HomeRnfModule } from './home-rnf/home-rnf.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeContentComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeRnfModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
