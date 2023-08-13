import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Subscription } from 'rxjs';

import { User } from '../model/user';
import { DateFilter } from '../model/DateFilter';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
    private userArrayObservable: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);
    private currentUserObservable: BehaviorSubject<User> = new BehaviorSubject<User>(
                                                                { id: 0, username: "", name: "", email: "" }
                                                            );

    constructor(private httpClient: HttpClient)
    {
        this.fetchAllUsersFromServer();
    }

    public getUserArrayObservable(): BehaviorSubject<Array<User>> { return this.userArrayObservable; }
    public getCurrentUserObservable(): BehaviorSubject<User> { return this.currentUserObservable; }

    public fetchAllUsersFromServer(): void
    {
        let apiUrl = "http://127.0.0.1:8001/api/user/all";

        this.httpClient.get<Array<User>>(apiUrl)
                                            .pipe()
                                            .subscribe( (users: Array<User>) =>
                                                {
                                                    this.userArrayObservable.next(users);
                                                    console.log("users fetched");
                                                }
                                            );
    }

    public setCurrentUser(user: User): void
    {
        if(user != null)
            this.currentUserObservable.next(user);
    }
}
