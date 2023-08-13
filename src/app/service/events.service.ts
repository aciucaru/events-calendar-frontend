import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { UserService } from './user.service';

import { MeetingAppointment } from '../model/meeting-appointment';
import { Invitation } from '../model/invitation';
import { OutOfOfficeEvent } from '../model/out-of-office-event';
import { User } from '../model/user';
import { DateService } from './date.service';
import { DateFilter } from '../model/date-filter';


@Injectable({
  providedIn: 'root'
})
export class EventsService
{
    private currentUser: User = { id: 0, username: "", name: "", email: "" };

    private dateFilter: DateFilter =
    {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        startDate: new Date(),
        endDate: new Date()
    };

    /* reusable buffer array for the corresponding BehaviorSubject, so that no new array is created everytime
    the BehaviorSubject needs to ghange and needs a new array; this array is reused and has a initial capacity
    of 5 weeks * 5 days/week x 8 hours/day x 4 hosted appointments/hour*/
    private hostedAppointmentArray: Array<MeetingAppointment> = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
    private hostedAppointmentArrayObservable: BehaviorSubject<Array<MeetingAppointment>>
                            = new BehaviorSubject<Array<MeetingAppointment>>(new Array<MeetingAppointment>());

    /* reusable buffer array for the corresponding BehaviorSubject, this array has a initial capacity
    of 5 weeks * 5 days/week x 8 hours/day x 8 meeting invitations/hour */
    private invitationArray: Array<Invitation> = new Array<Invitation>(5 * 5 * 8 * 8)
    private invitationArrayObservable: BehaviorSubject<Array<Invitation>>
                                = new BehaviorSubject<Array<Invitation>>(new Array<Invitation>());

    /* reusable buffer array for the corresponding BehaviorSubject, this array has a initial capacity
    of 5 weeks * 5 days/week x 4 out of office events/day */
    private outOfOfficeEventArray: Array<OutOfOfficeEvent> = new Array<OutOfOfficeEvent>(5 * 5 * 4);
    private outOfOfficeEventArrayObservable: BehaviorSubject<Array<OutOfOfficeEvent>>
                                = new BehaviorSubject<Array<OutOfOfficeEvent>>(new Array<OutOfOfficeEvent>());

    constructor(private httpClient: HttpClient,
                protected userService: UserService,
                protected dateService: DateService)
    {
        this.userService.getCurrentUserObservable()
                        .subscribe( (currentUser: User) => { this.currentUser = currentUser; } );

        this.dateService.getDateFilterObservable()
                        .subscribe( (dateFilter: DateFilter) => { this.dateFilter = dateFilter; } );
    }

    public getHostedAppointmentArrayObservable(): BehaviorSubject<Array<MeetingAppointment>>
    { return this.hostedAppointmentArrayObservable; }

    public getInvitationArrayObservable(): BehaviorSubject<Array<Invitation>>
    { return this.invitationArrayObservable }

    public getOutOfOfficeEventArrayObservable(): BehaviorSubject<Array<OutOfOfficeEvent>>
    { return this.outOfOfficeEventArrayObservable; }
}
