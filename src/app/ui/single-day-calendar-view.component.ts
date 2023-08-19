import { Component } from '@angular/core';
import { MeetingAppointment } from '../model/meeting-appointment';
import { Invitation } from '../model/invitation';

@Component({
  selector: 'single-day-calendar-view',
  template: `
    <p>
      single-day-calendar-view works!
    </p>
  `,
  styles: [],
  styleUrls: ['./invitations-view.component.scss']
})
export class SingleDayCalendarViewComponent
{
    // @Input() dayOfweek: number;
    protected hostedAppointmentArray: Array<MeetingAppointment>;
    protected acceptedInvitationArray: Array<Invitation>;

    public constructor()
    {
        this.hostedAppointmentArray = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
        this.acceptedInvitationArray = new Array<Invitation>(5 * 5 * 8 * 8);
    }
}
