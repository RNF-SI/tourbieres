import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './components/data/data.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { HomeRnfModule } from './home-rnf/home-rnf.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getFrenchPaginatorIntl } from './french-paginator-intl'
import { MatSortModule } from '@angular/material/sort';
import { FiltreReservesPipe } from './pipes/filtre-reserves.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip'; 

import {MatButtonModule} from '@angular/material/button'; 




@NgModule({
  declarations: [
    AppComponent,
    HomeContentComponent,
    DataComponent,
    FiltreReservesPipe
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    MatTooltipModule,
    MatButtonModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()},
    FiltreReservesPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
