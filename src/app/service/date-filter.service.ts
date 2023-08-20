import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { DateFilter, SingleWeekInterval } from '../model/date-filter';

@Injectable({
  providedIn: 'root'
})
export class DateFilterService
{
    // this observable is mainly for UI, so that any UI element can correctly display the select year, month or week
    private dateFilterObservable: BehaviorSubject<DateFilter>;
    // array of objects that contain the start and end date of all weeks in the current month of the current year
    private weekDateIntervals: Array<SingleWeekInterval>;
    private currentWeekIndex: number; // the index a the current select week, it's from 0 to 5
    // the actual observable used by the service that fetches data from the back-end, it contains a start data and an
    // end date which are used as query parameters in the URL
    private currentWeekObservable: BehaviorSubject<SingleWeekInterval>;
    
    private daysOfCurrentWeek: Array<Date>;
    // private daysOfCurrentWeekObservable: BehaviorSubject<Array<Date>>;

    constructor()
    {
        this.dateFilterObservable = new BehaviorSubject<DateFilter>(
            {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                weekIndex: 0
            }
        );
        this.weekDateIntervals = new Array<SingleWeekInterval>();
        this.currentWeekIndex = 0; // first week of the month

        this.currentWeekObservable
            = new BehaviorSubject<SingleWeekInterval>(new SingleWeekInterval(new Date(), new Date()));

        this.daysOfCurrentWeek = new Array<Date>();
        // this.daysOfCurrentWeekObservable = new BehaviorSubject<Array<Date>>(new Array<Date>());
    }

    public getDateFilterObservable(): BehaviorSubject<DateFilter> { return this.dateFilterObservable; }
    public getCurrentWeekObservable(): BehaviorSubject<SingleWeekInterval> { return this.currentWeekObservable; }
    // public getDaysOfCurrentWeekObservable(): BehaviorSubject<Array<Date>> { return this.daysOfCurrentWeekObservable; }

    public setDateFilter(dateFilter: DateFilter): void
    {
        if(dateFilter != null)
        {
            this.dateFilterObservable.next(dateFilter);

            this.calculateWeekIntervals(dateFilter.year, dateFilter.month);
            this.currentWeekIndex = dateFilter.weekIndex;
            this.currentWeekObservable.next(this.weekDateIntervals[this.currentWeekIndex]);

            this.daysOfCurrentWeek = this.currentWeekObservable.getValue().calculateDaysOfCurrentWeek();
            // this.daysOfCurrentWeekObservable.next(this.daysOfCurrentWeek);

            console.log(`setDateFilter year: ${dateFilter.year}`);
            console.log(`setDateFilter month: ${dateFilter.month}`);
            console.log(`setDateFilter weekIndex: ${dateFilter.weekIndex}`);
            console.log(`setDateFilter weekStart: ${this.weekDateIntervals[this.currentWeekIndex].getStart()}`
                        + `weekEnd: ${this.weekDateIntervals[this.currentWeekIndex].getEnd()}`);
        }
    }

    /* Helper method that calculates the number of weeks in a scpecific month, from a specific year;
    month is in range 1...12 */
    public getWeekCount(year: number, month: number): number
    {
        const firstDayOfMonth = new Date(year, month - 1, 1); // (year, monthIndex, day)
        const lastDayOfMonth = new Date(year, month, 0); // (year, monthIndex, day)

        // console.log(`first day of month: ${firstDayOfMonth}`);
        // console.log(`last day of month: ${lastDayOfMonth}`);

        let startDayIndexOfFirstWeek = firstDayOfMonth.getDay(); // returns 0 to 6 (Sunday to Saturday)
        if(startDayIndexOfFirstWeek === 0) startDayIndexOfFirstWeek = 7; // adjust Sunday which is 0, but we wanted 7

        let endDayIndexOfLastWeek = lastDayOfMonth.getDay(); // returns 0 to 6 (Sunday to Saturday)
        if(endDayIndexOfLastWeek === 0) endDayIndexOfLastWeek = 7; // adjust Sunday which is 0, but we wanted 7

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

    /* Helper method that gererates the dates between the weeks of o month from a certain year.
    For each week, this method generates two dates: the date at the start of the week and the date
    at the end of the week. */
    private calculateWeekIntervals(year: number, month: number): void
    {
        const numberOfWeeks = this.getWeekCount(year, month);
        const weekDatesArray: Array<SingleWeekInterval>
                                = new Array<SingleWeekInterval>(numberOfWeeks);

        const firstDayOfMonth = new Date(year, month - 1, 1); // (year, monthIndex, day)
        const lastDayOfMonth = new Date(year, month, 0); // (year, monthIndex, day)

        // get start and end days of first week, the first week might not have 7 complete days
        let startDayIndexOfFirstWeek = firstDayOfMonth.getDay(); // returns 0 to 6 (Sunday to Saturday)
        if(startDayIndexOfFirstWeek === 0) startDayIndexOfFirstWeek = 7; // Sunday is 0, but we wanted 7

        const firstWeekStartDay = new Date(firstDayOfMonth);
        const firstWeekEndDay = new Date(firstWeekStartDay);
        firstWeekEndDay.setDate(firstWeekEndDay.getDate() + (7 - startDayIndexOfFirstWeek)); // first Sunday of that month
        weekDatesArray[0] = new SingleWeekInterval(firstWeekStartDay, firstWeekEndDay);

        // get start and days of last week, the last week might not have 7 complete days
        let endDayIndexOfLastWeek = lastDayOfMonth.getDay(); // returns 0 to 6 (Sunday to Saturday)
        if(endDayIndexOfLastWeek === 0) endDayIndexOfLastWeek = 7; // Sunday is 0, but we wanted 7

        const lastWeekStartDay = new Date(lastDayOfMonth);
        lastWeekStartDay.setDate(lastWeekStartDay.getDate() - endDayIndexOfLastWeek + 1);
        const lastWeekEndDay = new Date(lastDayOfMonth);
        weekDatesArray[numberOfWeeks - 1] = new SingleWeekInterval(lastWeekStartDay, lastWeekEndDay);

        // determine the start and end dates of the in-between weeks
        // the iteration is being made from 2nd to and N-1 week, because the first and last week are already set
        // the dates of the first week are used as reference to incrementally generate the other dates
        let currentStartDay: Date;
        let currentEndDay: Date;
        for(let i=1; i<numberOfWeeks-1; i++)
        {
            currentStartDay = new Date(firstWeekEndDay);
            currentStartDay.setDate(currentStartDay.getDate() + 1 + 7*(i-1));

            currentEndDay = new Date(currentStartDay);
            currentEndDay.setDate(currentEndDay.getDate() + 6);

            weekDatesArray[i] = new SingleWeekInterval(currentStartDay, currentEndDay);
        }

        // console.table(weekDatesArray);

        this.weekDateIntervals = weekDatesArray;
    }
}
