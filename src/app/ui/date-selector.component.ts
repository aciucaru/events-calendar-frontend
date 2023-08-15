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
            <option *ngFor="let year of yearOptionArray"
            [selected]="year === dateFilter.year">
                {{year}}
            </option>
        </select>

        <label for="month-select">Month</label>
        <select #monthSelect name="month-select" class="month-select"
            (change)="selectMonth($event)">
            <option *ngFor="let month of monthOptionArray; let monthIndex = index;"
            [selected]="monthIndex === dateFilter.month-1">
                {{month}}
            </option>
        </select>

        <label for="week-select">Week</label>
        <select #weekSelect name="week-select" class="week-select"
            (change)="selectWeek($event)">
            <option *ngFor="let week of weekOptionArray; let weekIndex = index;">
                Week {{weekIndex}}
            </option>
        </select>
    </div>
  `,
  styles: [],
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit
{
    protected dateFilter: DateFilter = {
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

    protected numberOfWeeksInCurrentnMonth: number = 0;
    protected weekOptionArray: Array<{weekStart: Date; weekEnd: Date;}>
                                = new Array<{weekStart: Date; weekEnd: Date;}>();

    // private hostedAppointmentArray: Array<MeetingAppointment> = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
    // private invitationArray: Array<Invitation> = new Array<Invitation>(5 * 5 * 8 * 8)
    // private outOfOfficeEventArray: Array<OutOfOfficeEvent> = new Array<OutOfOfficeEvent>(5 * 5 * 4);

    public constructor(protected dateFilterService: DateService) {}

    public ngOnInit(): void
    {
        this.dateFilterService
                .getDateFilterObservable()
                .subscribe( (dateFilter: DateFilter) =>
                                {
                                    this.dateFilter = dateFilter;
                                    this.setYearOptionArray(dateFilter.year);
                                    this.numberOfWeeksInCurrentnMonth = this.dateFilterService
                                                                            .getWeekCount(dateFilter.year, dateFilter.month);
                                    this.weekOptionArray = this.dateFilterService
                                                                .getWeekDateRange(dateFilter.year, dateFilter.month);
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

        this.numberOfWeeksInCurrentnMonth = this.dateFilterService
                                                .getWeekCount(this.dateFilter.year, this.dateFilter.month);

        this.weekOptionArray = this.dateFilterService.getWeekDateRange(this.dateFilter.year, this.dateFilter.month);

        console.log(`selected year: ${target.value}`);
        console.log(`number of weeks: ${this.numberOfWeeksInCurrentnMonth}`);
    }

    public selectMonth(event: Event): void
    {
        const target = event.target as HTMLSelectElement;

        // the monthIndex will be between 1 and 12
        const monthIndex = this.monthOptionArray.findIndex( (month: string) => month === target.value) + 1;

        this.dateFilter.month = monthIndex;
        this.dateFilterService.setDateFilter(this.dateFilter);

        this.numberOfWeeksInCurrentnMonth = this.dateFilterService
                                                .getWeekCount(this.dateFilter.year, this.dateFilter.month);

        this.weekOptionArray = this.dateFilterService.getWeekDateRange(this.dateFilter.year, this.dateFilter.month);

        console.log(`selected month index: ${monthIndex}`);
        console.log(`number of weeks: ${this.numberOfWeeksInCurrentnMonth}`);
    }

    public selectWeek(event: Event): void
    {
        const target = event.target as HTMLSelectElement;
    }
}
