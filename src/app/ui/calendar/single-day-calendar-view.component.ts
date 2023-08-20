import { Component, OnInit } from '@angular/core';
import { MeetingAppointment } from '../../model/events';
import { Invitation } from '../../model/events';
import { OutOfOfficeEvent } from '../../model/events';
import { EventsService } from '../../service/events.service';
import { SingleDayHostedAppointments } from '../../model/date-filter';

@Component({
  selector: 'single-day-calendar-view',
  template: `
    <div class="main-container">
        <div class="date"></div>
        <div *ngFor="let hostedAppointment of hostedAppointmentArray; let i = index">A</div>
        <div *ngFor="let acceptedInvitation of acceptedInvitationArray; let i = index"></div>
        <div *ngFor="let outOfOfficeEvent of outOfOfficeEventArray; let i = index"></div>
    </div>
  `,
  styles: [],
  styleUrls: ['./single-day-calendar-view.component.scss']
})
export class SingleDayCalendarViewComponent implements OnInit
{
    // @Input() dayOfweek: number;
    dayOfweek: number = 0;
    protected hostedAppointmentArray: Array<MeetingAppointment>;
    protected acceptedInvitationArray: Array<Invitation>;
    protected outOfOfficeEventArray: Array<OutOfOfficeEvent>;

    public constructor(protected eventService: EventsService)
    {
        this.hostedAppointmentArray = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
        this.acceptedInvitationArray = new Array<Invitation>(5 * 5 * 8 * 8);
        this.outOfOfficeEventArray = new Array<OutOfOfficeEvent>(5 * 5 * 4);
    }

    public ngOnInit(): void
    {
        this.eventService.getHostedAppointmentsByWeekDaysObservable()
                        .subscribe( (singleDayAppointments: Array<SingleDayHostedAppointments>) =>
                            {
                                this.hostedAppointmentArray = singleDayAppointments[this.dayOfweek].getArray();
                            }
                        );
    }
}
