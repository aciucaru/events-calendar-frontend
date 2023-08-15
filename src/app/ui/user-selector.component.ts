import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { User } from '../model/user';


@Component({
  selector: 'user-selector',
  template: `
    <div class="main-container">
        <label for="user-select">User {{currentUser.name}}</label>
        <select #userSelect name="user-select" class="user-select" 
            (change)="selectUser($event)">
            <option *ngFor="let user of users; let i = index">{{user.email}}</option>
        </select>
    </div>
  `,
  styles: [],
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit
{
    public cities: Array<string> = [];
    public users: Array<User> = [];
    public currentUser: User = { id: 0, username: "", name: "Please select", email: "" };

    public constructor(protected userService: UserService) {}

    public ngOnInit(): void
    {
        this.userService.getUserArrayObservable()
                        .subscribe( (users: Array<User>) => { this.users = users; } );

        this.userService.getCurrentUserObservable()
                        .subscribe( (currentUser: User) => { this.currentUser = currentUser;} );
    }

    public selectUser(event: any)
    {
        this.userService.setCurrentUser(this.users[event.target['selectedIndex']])
        console.log(event.target['selectedIndex']);
    }
}
