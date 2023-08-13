import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // required for [ngModule]

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainUiComponent } from './ui/main-ui.component';
import { TopToolbarComponent } from './ui/top-toolbar.component';
import { UserSelectorComponent } from './ui/user-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    MainUiComponent,
    TopToolbarComponent,
    UserSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
