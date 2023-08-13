import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { DateFilter } from '../model/DateFilter';

@Injectable({
  providedIn: 'root'
})
export class DateService
{
    private currentFilterDateObservable: BehaviorSubject<DateFilter> = new BehaviorSubject<DateFilter>(
                                                                                {
                                                                                    year: new Date().getFullYear(),
                                                                                    month: new Date().getMonth(),
                                                                                    startDate: new Date(),
                                                                                    endDate: new Date()
                                                                                }
                                                                            );

    constructor() { }

    public getCurrentFilterDateObservable(): BehaviorSubject<DateFilter> { return this.currentFilterDateObservable; }
}
