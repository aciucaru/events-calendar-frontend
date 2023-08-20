import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { UserService } from './user.service';

import { MeetingAppointment } from '../model/events';
import { Invitation } from '../model/events';
import { OutOfOfficeEvent } from '../model/events';
import { User } from '../model/user';
import { DateFilterService } from './date-filter.service';
import { DateFilter, SingleDayHostedAppointments, SingleDayInvitations, SingleDayOutOfOfficeEvents, SingleWeekInterval } from '../model/date-filter';


@Injectable({
  providedIn: 'root'
})
export class EventsService
{
    private currentUser: User;
    private weekInterval: SingleWeekInterval;
    private daysOfCurrentWeek: Array<Date>;
    private startDateString: string = "";
    private endDateString: string = "";

    private hostedAppointmentArrayObservable: BehaviorSubject<Array<MeetingAppointment>>;
    private invitationArrayObservable: BehaviorSubject<Array<Invitation>>;
    private outOfOfficeEventArrayObservable: BehaviorSubject<Array<OutOfOfficeEvent>>;

    private hostedAppointmentsByWeekDaysObservable: BehaviorSubject<Array<SingleDayHostedAppointments>>;
    private invitationsByWeekDaysObservable: BehaviorSubject<Array<SingleDayInvitations>>;
    private outOfOfficeEventsByWeekDaysObservable: BehaviorSubject<Array<SingleDayOutOfOfficeEvents>>;

    constructor(private httpClient: HttpClient,
                protected userService: UserService,
                protected dateService: DateFilterService)
    {
        this.currentUser = { id: 0, username: "", name: "", email: "" };
        this.weekInterval = new SingleWeekInterval(new Date(), new Date());
        this.daysOfCurrentWeek = new Array<Date>();

        this.hostedAppointmentArrayObservable // new Array<MeetingAppointment>(5 * 5 * 8 * 4)
                 = new BehaviorSubject<Array<MeetingAppointment>>(new Array<MeetingAppointment>());
        // new Array<Invitation>(5 * 5 * 8 * 8)
        this.invitationArrayObservable = new BehaviorSubject<Array<Invitation>>(new Array<Invitation>());
    
        this.outOfOfficeEventArrayObservable // new Array<Invitation>(5 * 5 * 8 * 8)
                                    = new BehaviorSubject<Array<OutOfOfficeEvent>>(new Array<OutOfOfficeEvent>());

        this.hostedAppointmentsByWeekDaysObservable =
            new BehaviorSubject<Array<SingleDayHostedAppointments>>(new Array<SingleDayHostedAppointments>());

        this.invitationsByWeekDaysObservable =
            new BehaviorSubject<Array<SingleDayInvitations>>(new Array<SingleDayInvitations>());

        this.outOfOfficeEventsByWeekDaysObservable =
            new BehaviorSubject<Array<SingleDayOutOfOfficeEvents>>(new Array<SingleDayOutOfOfficeEvents>());

            // subscribe tot the observables of the UserService and DateFilterService
        this.userService.getCurrentUserObservable()
                        .subscribe( (currentUser: User) =>
                            {
                                this.currentUser = currentUser;
                                this.fetchAllHostedAppointmentsInCurrentWeek();
                                this.fetchAllInvitationsInCurrentWeek();
                            }
                        );

        this.dateService.getCurrentWeekObservable()
                        .subscribe( (weekInterval: SingleWeekInterval) =>
                            {
                                this.weekInterval = weekInterval;

                                const startDate = this.weekInterval.getStart();
                                const endDate = this.weekInterval.getEnd();
                        
                                this.startDateString = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
                                this.endDateString = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;
                                
                                this.daysOfCurrentWeek = weekInterval.calculateDaysOfCurrentWeek();

                                this.fetchAllHostedAppointmentsInCurrentWeek();
                                this.fetchAllInvitationsInCurrentWeek();
                                this.fetchAllOutOfOfficeEventsInCurrentWeek();

                                this.fetchAllHostedAppointmentsByDays();
                            }
                        );
    }

    public getHostedAppointmentArrayObservable(): BehaviorSubject<Array<MeetingAppointment>>
    { return this.hostedAppointmentArrayObservable; }

    public getInvitationArrayObservable(): BehaviorSubject<Array<Invitation>>
    { return this.invitationArrayObservable }

    public getOutOfOfficeEventArrayObservable(): BehaviorSubject<Array<OutOfOfficeEvent>>
    { return this.outOfOfficeEventArrayObservable; }



    public getHostedAppointmentsByWeekDaysObservable(): BehaviorSubject<Array<SingleDayHostedAppointments>>
    { return this.hostedAppointmentsByWeekDaysObservable; }

    public getInvitationsByWeekDaysObservable(): BehaviorSubject<Array<SingleDayInvitations>>
    { return this.invitationsByWeekDaysObservable; }

    public getOutOfOfficeEventsByWeekDaysObservable(): BehaviorSubject<Array<SingleDayOutOfOfficeEvents>>
    { return this.outOfOfficeEventsByWeekDaysObservable; }


    public fetchAllHostedAppointmentsInCurrentWeek(): void
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
                                this.hostedAppointmentArrayObservable.next(appointments);
                                console.log("appointments fetched");
                                // console.table(appointments);
                                console.log(`fetch app: start: ${this.startDateString} end: ${this.endDateString}`);
                            }
                        );
    }

    public fetchAllInvitationsInCurrentWeek(): void
    {
        const userId = this.currentUser.id;

        let apiUrl = `http://127.0.0.1:8001/api/user/${userId}/activeInvitationsByDate`
                        + `?startDate=${this.startDateString}&endDate=${this.endDateString}`;

        this.httpClient.get<Array<Invitation>>(apiUrl)
                        .pipe()
                        .subscribe( (invitations: Array<Invitation>) =>
                            {
                                this.invitationArrayObservable.next(invitations);
                                console.log("appointments fetched");
                                // console.table(invitations);
                                console.log(`fetch inv: start: ${this.startDateString} end: ${this.endDateString}`);
                            }
                        );
    }

    public fetchAllOutOfOfficeEventsInCurrentWeek(): void
    {
        const userId = this.currentUser.id;

        let apiUrl = `http://127.0.0.1:8001/api/user/${userId}/outOfOfficeEventsByDate`
                        + `?startDate=${this.startDateString}&endDate=${this.endDateString}`;

        this.httpClient.get<Array<OutOfOfficeEvent>>(apiUrl)
                        .pipe()
                        .subscribe( (outOfOfficeEvents: Array<OutOfOfficeEvent>) =>
                            {
                                this.outOfOfficeEventArrayObservable.next(outOfOfficeEvents);
                                console.log("out-of-office fetched");
                                // console.table(invitations);
                                console.log(`fetch inv: start: ${this.startDateString} end: ${this.endDateString}`);
                            }
                        );
    }


    /////////////////////////////////////////////////////////
    public fetchAllHostedAppointmentsByDays(): void
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
                                const daysCount = this.daysOfCurrentWeek.length;

                                const hostedAppointmentsByWeekDays = new Array<SingleDayHostedAppointments>(daysCount);
                                let currentDayAppointments: Array<MeetingAppointment>;
                                let startDate: Date;
                                let endDate: Date;
                                for(let i=0; i<daysCount; i++)
                                {
                                    startDate = new Date(this.weekInterval.getStart());
                                    startDate.setDate(startDate.getDate() + i);
                        
                                    endDate = new Date(startDate);
                                    endDate.setDate(endDate.getDate() + 1);

                                    currentDayAppointments = appointments.filter( (appointment: MeetingAppointment) =>
                                        {
                                            return (appointment.start.getTime() >= startDate.getTime()
                                                    && appointment.start.getTime() <= endDate.getTime());
                                        }
                                    )

                                    hostedAppointmentsByWeekDays[i] = new SingleDayHostedAppointments();
                                    hostedAppointmentsByWeekDays[i].setArray(currentDayAppointments);
                                }

                                this.hostedAppointmentsByWeekDaysObservable.next(hostedAppointmentsByWeekDays);
                                console.log("appointments fetched");
                                console.table(hostedAppointmentsByWeekDays);
                                console.log(`fetch app: start: ${this.startDateString} end: ${this.endDateString}`);
                            }
                        );
    }
}
