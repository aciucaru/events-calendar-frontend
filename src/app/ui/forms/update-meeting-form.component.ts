import { Component } from '@angular/core';
import { EventsService } from 'src/app/service/events.service';

@Component({
  selector: 'update-meeting-form',
  template: `
    <div class="main-container">
        <label for="meeting-id">Meeting ID</label>
        <input type="number" min="0" name="meeting-id" (input)="onMeetingIdChange($event)">

        <label for="start-date">Meeting start</label>
        <input type="date" name="start-date" (change)="onStartDateChange($event)">

        <label for="end-date">Meeting end</label>
        <input type="date" name="end-date" (change)="onEndDateChange($event)">

        <button (click)="onMeetingAppointmentUpdate($event)">Update appointment</button>
    </div>
  `,
  styles: [],
  styleUrls: ['./update-meeting-form.component.scss']
})
export class UpdateMeetingFormComponent
{
    private meetingId: number;
    private startDate: Date;
    private endDate: Date;

    public constructor(private eventsService: EventsService)
    {
        this.meetingId = 0;
        this.startDate = new Date();
        this.endDate = new Date();
    }

    protected onMeetingIdChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;
        this.meetingId = parseInt(target.value);

        console.log(`meetingId: ${target.value}`);
    }

    protected onStartDateChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;

        console.log(`startDate: ${target.value}`);
    }

    protected onEndDateChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;

        console.log(`endDate: ${target.value}`);
    }

    protected onMeetingAppointmentUpdate(event: Event): void
    {
        this.eventsService.updateAppointment(this.meetingId, this.startDate, this.endDate);

        console.log('onMeetingAppointmentUpdate');
    }
}
