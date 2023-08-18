import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { UserService } from './user.service';

import { MeetingAppointment } from '../model/meeting-appointment';
import { Invitation } from '../model/invitation';
import { OutOfOfficeEvent } from '../model/out-of-office-event';
import { User } from '../model/user';
import { DateFilterService } from './date-filter.service';
import { DateFilter, WeekInterval } from '../model/date-filter';


@Injectable({
  providedIn: 'root'
})
export class EventsService
{
    private currentUser: User;
    private weekDates: WeekInterval;
    private startDateString: string = "";
    private endDateString: string = "";

    // private dateFilter: DateFilter;

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
                protected dateService: DateFilterService)
    {
        this.currentUser = { id: 0, username: "", name: "", email: "" };
        this.weekDates = { weekStart: new Date(), weekEnd: new Date() };

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

        // this.dateService.getDateFilterObservable()
        //                 .subscribe( (dateFilter: DateFilter) =>
        //                     {
        //                         this.dateFilter = dateFilter;
        //                         this.fetchHostedAppointments();
        //                         this.fetchInvitations();
        //                     }
        //                 );

        this.dateService.getCurrentWeekDatesObservable()
                        .subscribe( (weekDates: WeekInterval) =>
                            {
                                this.weekDates = weekDates;

                                const startDate = this.weekDates.weekStart;
                                const endDate = this.weekDates.weekEnd;
                        
                                this.startDateString = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
                                this.endDateString = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`; 
                                
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
        // console.log(`fetchHostedAppointments startDate: ${this.dateFilter.startDate}`);
        // console.log(`fetchHostedAppointments endDate: ${this.dateFilter.endDate}`);

        // console.log(this.dateFilter.endDate);

        const userId = this.currentUser.id;

        let apiUrl = `http://127.0.0.1:8001/api/user/${userId}/activeHostedAppointmentsByDate`
                        + `?startDate=${this.startDateString}&endDate=${this.endDateString}`;

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

        let apiUrl = `http://127.0.0.1:8001/api/user/${userId}/activeInvitationsByDate`
                        + `?startDate=${this.startDateString}&endDate=${this.endDateString}`;

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
