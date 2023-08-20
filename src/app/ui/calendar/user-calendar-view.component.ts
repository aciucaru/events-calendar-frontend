import { Component } from '@angular/core';
import { MeetingAppointment } from '../../model/events';
import { Invitation } from '../../model/events';
import { EventsService } from '../../service/events.service';

@Component({
  selector: 'user-calendar-view',
  template: `
    <div class="main-container">
        <single-day-calendar-view></single-day-calendar-view>
        <single-day-calendar-view></single-day-calendar-view>
        <single-day-calendar-view></single-day-calendar-view>
        <single-day-calendar-view></single-day-calendar-view>
        <single-day-calendar-view></single-day-calendar-view>
    </div>
  `,
  styles: [],
  styleUrls: ['./user-calendar-view.component.scss']
})
export class UserCalendarViewComponent
{
    public constructor()
    {
        
    }
}
