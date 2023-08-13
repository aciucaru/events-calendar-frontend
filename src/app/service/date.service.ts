import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { DateFilter } from '../model/date-filter';

@Injectable({
  providedIn: 'root'
})
export class DateService
{
    private currentDateFilterObservable: BehaviorSubject<DateFilter> = new BehaviorSubject<DateFilter>(
                                                                                {
                                                                                    year: new Date().getFullYear(),
                                                                                    month: new Date().getMonth(),
                                                                                    startDate: new Date(),
                                                                                    endDate: new Date()
                                                                                }
                                                                            );

    constructor() { }

    public getCurrentDateFilterObservable(): BehaviorSubject<DateFilter> { return this.currentDateFilterObservable; }

    public setDateFilter(dateFilter: DateFilter): void
    {
        if(dateFilter != null)
            this.currentDateFilterObservable.next(dateFilter);
    }


}
