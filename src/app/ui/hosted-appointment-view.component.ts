import { Component, OnInit } from '@angular/core';

import { DateService } from '../service/date.service';

import { MeetingAppointment } from '../model/meeting-appointment';
import { DateFilter } from '../model/date-filter';
import { EventsService } from '../service/events.service';

@Component({
  selector: 'hosted-appointment-view',
  template: `
    <p>
      hosted-appointment-view works!
    </p>
  `,
  styles: [],
  styleUrls: ['./hosted-appointment-view.component.scss']
})
export class HostedAppointmentViewComponent implements OnInit
{
    protected dateFilter: DateFilter;
    private hostedAppointmentArray: Array<MeetingAppointment>;

    public constructor(protected eventService: EventsService, protected dateFilterService: DateService)
    {
        this.hostedAppointmentArray = new Array<MeetingAppointment>(5 * 5 * 8 * 4);

        this.dateFilter = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            startDate: new Date(),
            endDate: new Date()
        };
    }

    public ngOnInit(): void
    {
        this.dateFilterService
                .getDateFilterObservable()
                .subscribe( (dateFilter: DateFilter) =>
                                {
                                    this.dateFilter = dateFilter;
                                }
                            );
                 
        this.eventService.getHostedAppointmentArrayObservable()
                            .subscribe( (appointmentArray: Array<MeetingAppointment>) =>
                                {
                                    this.hostedAppointmentArray = appointmentArray;
                                }
                            );
    }
}
