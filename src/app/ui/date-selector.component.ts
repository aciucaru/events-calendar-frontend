import { Component, OnInit } from '@angular/core';

import { EventsService } from '../service/events.service';

import { MeetingAppointment } from '../model/meeting-appointment';
import { Invitation } from '../model/invitation';
import { OutOfOfficeEvent } from '../model/out-of-office-event';

@Component({
  selector: 'date-selector',
  template: `
    <p>
      date-selector works!
    </p>
  `,
  styles: [],
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit
{
    // private hostedAppointmentArray: Array<MeetingAppointment> = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
    // private invitationArray: Array<Invitation> = new Array<Invitation>(5 * 5 * 8 * 8)
    // private outOfOfficeEventArray: Array<OutOfOfficeEvent> = new Array<OutOfOfficeEvent>(5 * 5 * 4);

    public constructor(protected eventService: EventsService) {}

    public ngOnInit(): void
    {
        // this.eventService.getHostedAppointmentArrayObservable()
        //                     .subscribe( (appointmentArray: Array<MeetingAppointment>) =>
        //                         {
        //                             this.hostedAppointmentArray = appointmentArray;
        //                         }
        //                     );

        // this.eventService.getInvitationArrayObservable()
        //                     .subscribe( (invitationArray: Array<Invitation>) =>
        //                         {
        //                             this.invitationArray = invitationArray;
        //                         }
        //                     );

        // this.eventService.getOutOfOfficeEventArrayObservable()
        //                     .subscribe( (outOfOfficeEventArray: Array<OutOfOfficeEvent>) =>
        //                         {
        //                             this.outOfOfficeEventArray = outOfOfficeEventArray;
        //                         }
        //                     );                          
    }
}
