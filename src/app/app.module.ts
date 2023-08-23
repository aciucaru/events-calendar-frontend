import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // required for [ngModule]
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainUiComponent } from './ui/main-ui.component';
import { TopToolbarComponent } from './ui/filter/top-toolbar.component';
import { UserSelectorComponent } from './ui/filter/user-selector.component';
import { DateSelectorComponent } from './ui/filter/date-selector.component';
import { HostedAppointmentViewComponent } from './ui/debug/hosted-appointment-view.component';
import { InvitationsViewComponent } from './ui/debug/invitations-view.component';
import { TabPanelComponent } from './ui/tab/tab-panel.component';
import { TabItemComponent } from './ui/tab/tab-item.component';
import { OutOfOfficeViewComponent } from './ui/debug/out-of-office-view.component';
import { UserCalendarViewComponent } from './ui/calendar/user-calendar-view.component';
import { SingleDayCalendarViewComponent } from './ui/calendar/single-day-calendar-view.component';
import { NewMeetingFormComponent } from './ui/forms/new-meeting-form.component';
import { UpdateMeetingFormComponent } from './ui/forms/update-meeting-form.component';
import { AddInvitationFormComponent } from './ui/forms/add-invitation-form.component';


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
    UserCalendarViewComponent,
    SingleDayCalendarViewComponent,
    NewMeetingFormComponent,
    UpdateMeetingFormComponent,
    AddInvitationFormComponent,
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
