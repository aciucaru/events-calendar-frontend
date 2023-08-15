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

    private dateFilter: DateFilter;

    /* reusable buffer array for the corresponding BehaviorSubject, so that no new array is created everytime
    the BehaviorSubject needs to ghange and needs a new array */
    private hostedAppointmentArray: Array<MeetingAppointment>;
    private hostedAppointmentArrayObservable: BehaviorSubject<Array<MeetingAppointment>>;;

    /* reusable buffer array for the corresponding BehaviorSubject */
    private invitationArray: Array<Invitation>;
    private invitationArrayObservable: BehaviorSubject<Array<Invitation>>;

    /* reusable buffer array for the corresponding BehaviorSubject */
    private outOfOfficeEventArray: Array<OutOfOfficeEvent>;
    private outOfOfficeEventArrayObservable: BehaviorSubject<Array<OutOfOfficeEvent>>;

    constructor(private httpClient: HttpClient,
                protected userService: UserService,
                protected dateService: DateService)
    {
        this.currentUser = { id: 0, username: "", name: "", email: "" };

        this.dateFilter =
        {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            startDate: new Date(),
            endDate: new Date()
        };
    
        /* reusable buffer array which has a initial capacity of:
        5 weeks * 5 days/week x 8 hours/day x 4 hosted appointments/hour*/
        this.hostedAppointmentArray = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
        this.hostedAppointmentArrayObservable
                 = new BehaviorSubject<Array<MeetingAppointment>>(new Array<MeetingAppointment>());
    
        /* reusable buffer array which has a initial capacity of:
        5 weeks * 5 days/week x 8 hours/day x 8 meeting invitations/hour */
        this.invitationArray = new Array<Invitation>(5 * 5 * 8 * 8)
        this.invitationArrayObservable = new BehaviorSubject<Array<Invitation>>(new Array<Invitation>());
    
        /* reusable buffer array which has a initial capacity of:
        5 weeks * 5 days/week x 4 out of office events/day */
        this.outOfOfficeEventArray = new Array<OutOfOfficeEvent>(5 * 5 * 4);
        this.outOfOfficeEventArrayObservable
                                    = new BehaviorSubject<Array<OutOfOfficeEvent>>(new Array<OutOfOfficeEvent>());

        this.userService.getCurrentUserObservable()
                        .subscribe( (currentUser: User) =>
                            {
                                this.currentUser = currentUser;
                                this.fetchHostedAppointments();
                                this.fetchInvitations();
                            }
                        );

        this.dateService.getDateFilterObservable()
                        .subscribe( (dateFilter: DateFilter) =>
                            {
                                this.dateFilter = dateFilter;
                                this.fetchHostedAppointments();
                                this.fetchInvitations();
                            }
                        );
    }

    public getHostedAppointmentArrayObservable(): BehaviorSubject<Array<MeetingAppointment>>
    { return this.hostedAppointmentArrayObservable; }

    public getInvitationArrayObservable(): BehaviorSubject<Array<Invitation>>
    { return this.invitationArrayObservable }

    public getOutOfOfficeEventArrayObservable(): BehaviorSubject<Array<OutOfOfficeEvent>>
    { return this.outOfOfficeEventArrayObservable; }

    public fetchHostedAppointments(): void
    {
        const userId = this.currentUser.id;

        const startDate = `${this.dateFilter.startDate.getFullYear()}`
                            + `-${this.dateFilter.startDate.getMonth()+1}`
                            + `-${this.dateFilter.startDate.getDate()}`;

        const endDate = `${this.dateFilter.endDate.getFullYear()}`
                        + `-${this.dateFilter.endDate.getMonth()+1}`
                        + `-${this.dateFilter.endDate.getDate()}`;                    
        let apiUrl = `http://127.0.0.1:8001/api/user/${userId}/activeHostedAppointmentsByDate`
                        + `?startDate=${startDate}&endDate=${endDate}`;

        this.httpClient.get<Array<MeetingAppointment>>(apiUrl)
                        .pipe()
                        .subscribe( (appointments: Array<MeetingAppointment>) =>
                            {
                                this.hostedAppointmentArray = appointments;
                                this.hostedAppointmentArrayObservable.next(appointments);
                                console.log("appointments fetched");
                                console.table(appointments);
                            }
                        );
    }

    public fetchInvitations(): void
    {
        const userId = this.currentUser.id;

        const startDate = `${this.dateFilter.startDate.getFullYear()}`
                            + `-${this.dateFilter.startDate.getMonth()+1}`
                            + `-${this.dateFilter.startDate.getDate()}`;

        const endDate = `${this.dateFilter.endDate.getFullYear()}`
                        + `-${this.dateFilter.endDate.getMonth()+1}`
                        + `-${this.dateFilter.endDate.getDate()}`;    

        let apiUrl = `http://127.0.0.1:8001/api/user/${userId}/activeInvitationsByDate`
                        + `?startDate=${startDate}&endDate=${endDate}`;

        this.httpClient.get<Array<Invitation>>(apiUrl)
                        .pipe()
                        .subscribe( (invitations: Array<Invitation>) =>
                            {
                                this.invitationArray = invitations;
                                this.invitationArrayObservable.next(invitations);
                                console.log("appointments fetched");
                                console.table(invitations);
                            }
                        );
    }
}
