import { Component } from '@angular/core';
import { MeetingAppointment } from '../model/events';
import { Invitation } from '../model/events';
import { EventsService } from '../service/events.service';

@Component({
  selector: 'user-calendar-view',
  template: `
    <div class="main-container">
        <table class="data-table">
            <thead class="table-header">
                <tr>
                    <td scope="col" class="table-header-cell id-col">id</td>
                    <td scope="col" class="table-header-cell meeting-id-fk-col">meeting_id_fk</td>
                    <td scope="col" class="table-header-cell active-col">active</td>
                    <td scope="col" class="table-header-cell start-col">start</td>
                    <td scope="col" class="table-header-cell end-col">end</td>
                    <td scope="col" class="table-header-cell meeting-event-col">meeting_event</td>
                </tr>
            </thead>

            <tbody class="table-body">
                <tr *ngFor="let appointment of hostedAppointmentArray; let rowIndex=index">
                    <td class="table-body-cell id-col">{{appointment.id}}</td>
                    <td class="table-body-cell meeting-id-fk-col">{{appointment.meeting_id_fk}}</td>
                    <td class="table-body-cell active-col">{{appointment.active}}</td>
                    <td class="table-body-cell start-col">{{appointment.start}}</td>
                    <td class="table-body-cell end-col">{{appointment.end}}</td>
                    <td class="table-body-cell meeting-event-col">{{appointment.meeting_event}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  `,
  styles: []
})
export class UserCalendarViewComponent
{
    protected hostedAppointmentArray: Array<MeetingAppointment>;
    protected acceptedInvitationArray: Array<Invitation>;

    public constructor(protected eventsService: EventsService)
    {
        this.hostedAppointmentArray = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
        this.acceptedInvitationArray = new Array<Invitation>(5 * 5 * 8 * 8);
    }
}
