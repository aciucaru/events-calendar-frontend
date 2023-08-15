import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { DateFilter } from '../model/date-filter';

@Injectable({
  providedIn: 'root'
})
export class DateService
{
    private dateFilterObservable: BehaviorSubject<DateFilter> = new BehaviorSubject<DateFilter>(
                                                                                {
                                                                                    year: new Date().getFullYear(),
                                                                                    month: new Date().getMonth(),
                                                                                    startDate: new Date(),
                                                                                    endDate: new Date()
                                                                                }
                                                                            );

    constructor() { }

    public getDateFilterObservable(): BehaviorSubject<DateFilter> { return this.dateFilterObservable; }

    public setDateFilter(dateFilter: DateFilter): void
    {
        if(dateFilter != null)
            this.dateFilterObservable.next(dateFilter);
    }

    /* helper method that calculates the number of weeks in a scpecific month, from a specific year;
    month is in range 1...12 */
    public getWeekCount(year: number, month: number): number
    {
        const firstDayOfMonth = new Date(year, month - 1, 1); // (year, monthIndex, day)
        const lastDayOfMonth = new Date(year, month, 0); // (year, monthIndex, day)

        // console.log(`first day of month: ${firstDayOfMonth}`);
        // console.log(`last day of month: ${lastDayOfMonth}`);

        let startDayIndexOfFirstWeek = firstDayOfMonth.getDay(); // returns 0 to 6 (Sunday to Saturday)
        if(startDayIndexOfFirstWeek === 0) startDayIndexOfFirstWeek = 7; // Sunday is 0, but we wanted 7

        let endDayIndexOfLastWeek = lastDayOfMonth.getDay(); // returns 0 to 6 (Sunday to Saturday)
        if(endDayIndexOfLastWeek === 0) endDayIndexOfLastWeek = 7; // Sunday is 0, but we wanted 7

        // console.log(`startDayIndexOfFirstWeek: ${startDayIndexOfFirstWeek}`);
        // console.log(`endDayIndexOfLastWeek: ${endDayIndexOfLastWeek}`);

        /* Until now there are 2 weeks counted: the first week and the last week of the month.
        To find out how many intermediate weeks there are, we must find the first day (date) of the first
        intermediate week and the last day (date) of the last intermediate week. The number of days in this
        interval should be a multiple of 7 and the number of intermediate weeks can be obtained by dividing by 7. */
        const intervalStartDay = new Date(firstDayOfMonth);
        intervalStartDay.setDate(intervalStartDay.getDate() + (8 - startDayIndexOfFirstWeek));

        const intervalEndDay = new Date(lastDayOfMonth);
        intervalEndDay.setDate(intervalEndDay.getDate() - endDayIndexOfLastWeek);

        const daysInInterval = (intervalEndDay.getTime() - intervalStartDay.getTime()) / (24 * 3600 * 1000) + 1;
        const weeksInInterval = daysInInterval / 7;

        // console.log(`intervalStartDay: ${intervalStartDay}`);
        // console.log(`intervalEndDay: ${intervalEndDay}`);
        // console.log(`days in interval: ${daysInInterval}`);
        // console.log(`weeks in interval: ${weeksInInterval}`);

        return weeksInInterval + 2;
    }


}
