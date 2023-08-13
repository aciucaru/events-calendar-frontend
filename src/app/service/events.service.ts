import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MeetingAppointment } from '../model/meeting-appointment';
import { Invitation } from '../model/invitation';
import { OutOfOfficeEvent } from '../model/out-of-office-event';

@Injectable({
  providedIn: 'root'
})
export class EventsService
{
    private hostedAppointmentArrayObservable: BehaviorSubject<Array<MeetingAppointment>>
                            = new BehaviorSubject<Array<MeetingAppointment>>(new Array<MeetingAppointment>());

    private invitationArrayObservable: BehaviorSubject<Array<Invitation>>
                                = new BehaviorSubject<Array<Invitation>>(new Array<Invitation>());

    private outOfOfficeEvents: BehaviorSubject<Array<OutOfOfficeEvent>>
                                = new BehaviorSubject<Array<OutOfOfficeEvent>>(new Array<OutOfOfficeEvent>());

    constructor(private httpClient: HttpClient) { }


}
