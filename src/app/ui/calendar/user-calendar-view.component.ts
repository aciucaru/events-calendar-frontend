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
export class UserCalendarViewComponent implements OnInit
{
    protected currentWeekInterval: SingleWeekInterval;

    public constructor(protected dateFilterService: DateFilterService)
    {
        this.currentWeekInterval = new SingleWeekInterval(new Date(), new Date());
    }

    public ngOnInit(): void
    {
        this.dateFilterService.getCurrentWeekObservable()
                                .subscribe( (weekInterval: SingleWeekInterval) =>
                                    {
                                        this.currentWeekInterval = weekInterval;
                                    }
                                );
    }
}
