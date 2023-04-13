import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { RouterModule } from '@angular/router';
 



@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    HttpClientModule,
    // RouterModule.forRoot([
    //   {path: 'pokemon-list', component: PokemonListComponent},
    //   {path: '', redirectTo: 'pokemon-list', pathMatch: 'full'}
      
    // ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
