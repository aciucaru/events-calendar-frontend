import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MeetingService
{
    private currentUser: User;

    constructor(private userService: UserService, private httpClient: HttpClient)
    {
        this.currentUser = { id: 0, username: "", name: "", email: "" };

        this.userService.getCurrentUserObservable()
                        .subscribe( (user: User) => { this.currentUser = user; } );
    }


    public storeMeetingWithAppointment(meetingTitle: string,
                                        meetingDescription: string,
                                        startDate: Date,
                                        endDate: Date): void
    {
        const startDateString = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
        const endDateString = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;

        const JSONBody =
        {
            'host_user_id_fk': this.currentUser.id,
            'location_id_fk': 1, // always the same location, for simplicity
            'title': meetingTitle,
            'description': meetingDescription,
            'start': startDateString,
            'end': endDateString
        };

        let apiUrl = `http://127.0.0.1:8001/api/meeting`;

        this.httpClient.post(apiUrl, JSONBody);
    }
}
