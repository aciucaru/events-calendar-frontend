import { Component } from '@angular/core';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'new-meeting-form',
  template: `
    <div class="main-container">
        <label for="title">Title</label>
        <input type="text" name="title" (input)="onTitleChange($event)">

        <label for="description">Description</label>
        <input type="text" name="description" (input)="onDescriptionChange($event)">

        <label for="start-date">Meeting start</label>
        <input type="date" name="start-date" (change)="onStartDateChange($event)">

        <label for="end-date">Meeting end</label>
        <input type="date" name="end-date" (change)="onEndDateChange($event)">

        <button (click)="onMeetingCreate($event)">Add meeting</button>
    </div>
  `,
  styles: [],
  styleUrls: ['./new-meeting-form.component.scss']
})
export class NewMeetingFormComponent
{
    private title: string = "";
    private description: string = "";
    private startDate: Date = new Date();
    private endDate: Date = new Date();

    public constructor(private meetingService: MeetingService)
    {

    }

    protected onTitleChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;
        this.title = target.value;
        console.log(`title: ${target.value}`);
    }

    protected onDescriptionChange(event: Event): void
    {
        const target = event.target as HTMLInputElement;
        this.description = target.value;
        console.log(`description: ${target.value}`);
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

    protected onMeetingCreate(event: Event): void
    {
        
    }
}