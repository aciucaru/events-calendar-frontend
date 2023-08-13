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


}
