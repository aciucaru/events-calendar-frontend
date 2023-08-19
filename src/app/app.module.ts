import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // required for [ngModule]
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainUiComponent } from './ui/main-ui.component';
import { TopToolbarComponent } from './ui/top-toolbar.component';
import { UserSelectorComponent } from './ui/user-selector.component';
import { DateSelectorComponent } from './ui/date-selector.component';
import { HostedAppointmentViewComponent } from './ui/hosted-appointment-view.component';
import { InvitationsViewComponent } from './ui/invitations-view.component';
import { TabPanelComponent } from './ui/tab-panel.component';
import { TabItemComponent } from './ui/tab-item.component';
import { OutOfOfficeViewComponent } from './ui/out-of-office-view.component';


@NgModule({
  declarations: [
    AppComponent,
    MainUiComponent,
    TopToolbarComponent,
    UserSelectorComponent,
    DateSelectorComponent,
    HostedAppointmentViewComponent,
    InvitationsViewComponent,
    TabPanelComponent,
    TabItemComponent,
    OutOfOfficeViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
