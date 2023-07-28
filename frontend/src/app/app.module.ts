import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';

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
    HomeRnfModule,
    MatomoModule.forRoot({
      scriptUrl: 'https://matomo.reserves-naturelles.org/matomo.js',
      trackers: [
        {
          trackerUrl: 'https://matomo.reserves-naturelles.org/matomo.php',
          siteId: 5
        }
      ],
      routeTracking: {
        enable: true
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
