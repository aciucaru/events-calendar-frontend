import { Component, OnInit } from '@angular/core';
import { MeetingAppointment } from '../../model/events';
import { Invitation } from '../../model/events';
import { EventsService } from '../../service/events.service';
import { DateFilterService } from 'src/app/service/date-filter.service';
import { SingleWeekInterval } from 'src/app/model/date-filter';

@Component({
  selector: 'user-calendar-view',
  template: `
    <div class="main-container">
        <ng-container
        *ngFor="let day of [].constructor(daysCount).fill(1); let dayIndex = index;">
            <single-day-calendar-view [dayOfweekIndex]="dayIndex"></single-day-calendar-view>
        </ng-container>
    </div>
  `,
  styles: [],
  styleUrls: ['./user-calendar-view.component.scss']
})
export class UserCalendarViewComponent implements OnInit
{
    protected currentWeekInterval: SingleWeekInterval;
    protected daysCount: number = 0;

    public constructor(protected dateFilterService: DateFilterService)
    {
        this.currentWeekInterval = new SingleWeekInterval(new Date(), new Date());
    }

    public ngOnInit(): void
    {
        this.dateFilterService.getCurrentWeekIntervalObservable()
                                .subscribe( (weekInterval: SingleWeekInterval) =>
                                    {
                                        this.currentWeekInterval = weekInterval;
                                        this.daysCount = weekInterval.calculateNumOfDays();
                                    }
                                );
    }
}
