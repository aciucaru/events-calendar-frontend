import { Component, OnInit } from '@angular/core';

import { EventsService } from '../service/events.service';

import { MeetingAppointment } from '../model/meeting-appointment';
import { Invitation } from '../model/invitation';
import { OutOfOfficeEvent } from '../model/out-of-office-event';
import { DateService } from '../service/date.service';
import { DateFilter } from '../model/date-filter';

@Component({
  selector: 'date-selector',
  template: `
    <div class="main-container">
        <label for="year-select">Year</label>
        <select #yearSelect name="year-select" class="year-select"
            (change)="selectYear($event)">
            <option *ngFor="let year of yearOptionArray">{{year}}</option>
        </select>

        <label for="month-select">Month</label>
        <select #monthSelect name="month-select" class="month-select"
            (change)="selectMonth($event)">
            <option *ngFor="let month of monthOptionArray; let monthIndex = index;">{{monthIndex+1}}</option>
        </select>

        <label for="start-date-select">Start date</label>
        <input type="date" name="start-date-select" (change)="selectStartDate($event)">

        <label for="end-date-select">End date</label>
        <input type="date" name="end-date-select" (change)="selectEndDate($event)">
    </div>
  `,
  styles: [],
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit
{
    private dateFilter: DateFilter = {
                                        year: new Date().getFullYear(),
                                        month: new Date().getMonth(),
                                        startDate: new Date(),
                                        endDate: new Date()
                                    };
    protected yearOptionArray: Array<number> = new Array<number>(20);
    protected monthOptionArray: Array<string> =
    [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    // private hostedAppointmentArray: Array<MeetingAppointment> = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
    // private invitationArray: Array<Invitation> = new Array<Invitation>(5 * 5 * 8 * 8)
    // private outOfOfficeEventArray: Array<OutOfOfficeEvent> = new Array<OutOfOfficeEvent>(5 * 5 * 4);

    public constructor(protected dateFilterService: DateService) {}

    public ngOnInit(): void
    {
        this.dateFilterService.getDateFilterObservable()
                        .subscribe( (dateFilter: DateFilter) =>
                                        {
                                            this.dateFilter = dateFilter;
                                            this.setYearOptionArray(new Date().getFullYear());
                                        }
                                    );
                 
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

    private setYearOptionArray(middleYear: number): void
    {
        for(let i=0; i<this.yearOptionArray.length; i++)
        {
            this.yearOptionArray[i] = middleYear - Math.round(this.yearOptionArray.length / 2) + i;
        }
    }

    public selectYear(event: Event): void
    {
        const target = event.target as HTMLSelectElement;

        this.dateFilter.year = parseInt(target.value);
        this.dateFilterService.setDateFilter(this.dateFilter);

        console.log(target.value);
    }

    public selectMonth(event: Event): void
    {
        const target = event.target as HTMLSelectElement;

        this.dateFilter.month = parseInt(target.value);
        this.dateFilterService.setDateFilter(this.dateFilter);

        console.log(target.value);
    }

    public selectStartDate(event: Event): void
    {
        const target = event.target as HTMLDataElement;

        const newDate: Date = new Date(target.value);
        this.dateFilter.startDate = newDate;
        this.dateFilterService.setDateFilter(this.dateFilter);

        console.log(newDate);
    }

    public selectEndDate(event: Event): void
    {
        const target = event.target as HTMLDataElement;

        const newDate: Date = new Date(target.value);
        this.dateFilter.endDate = newDate;
        this.dateFilterService.setDateFilter(this.dateFilter);

        console.log(newDate);
    }


}
