import { Component } from '@angular/core';

import { DateFilterService } from '../../service/date-filter.service';
import { EventsService } from '../../service/events.service';

import { DateFilter } from '../../model/date-filter';

import { Invitation } from '../../model/events';

// id: number;
// appointment_id_fk: number;
// guest_user_id_fk: number;
// guest_answer: number;
// guest_user: User;

@Component({
  selector: 'invitations-view',
  template: `
    <div class="main-container">
        <p>Invitations</p>
        <table class="data-table">
            <thead class="table-header">
                <tr>
                    <td scope="col" class="table-header-cell id-col">id</td>
                    <td scope="col" class="table-header-cell appointment-id-fk-col">appointment_id_fk</td>
                    <td scope="col" class="table-header-cell guest-user-id-fk-col">guest_user_id_fk</td>
                    <td scope="col" class="table-header-cell guest-answer-col">guest_answer</td>
                </tr>
            </thead>

            <tbody class="table-body">
                <tr *ngFor="let invitation of invitationArray; let rowIndex=index">
                    <td class="table-body-cell id-col">{{invitation.id}}</td>
                    <td class="table-body-cell appointment-id-fk-col">{{invitation.appointment_id_fk}}</td>
                    <td class="table-body-cell guest-user-id-fk-col">{{invitation.guest_user_id_fk}}</td>
                    <td class="table-body-cell guest-answer-col">{{invitation.guest_answer}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  `,
  styles: [],
  styleUrls: ['./invitations-view.component.scss']
})
export class InvitationsViewComponent
{
    protected invitationArray: Array<Invitation>;

    public constructor(protected eventService: EventsService)
    {
        this.invitationArray = new Array<Invitation>(5 * 5 * 8 * 8);
    }

    public ngOnInit(): void
    {    
        this.eventService.getInvitationArrayObservable()
                            .subscribe( (invitationArray: Array<Invitation>) =>
                                {
                                    this.invitationArray = invitationArray;
                                }
                            );
    }
}
