import { Component, OnInit } from '@angular/core';
import { DateFilter } from '../model/date-filter';
import { OutOfOfficeEvent } from '../model/out-of-office-event';
import { EventsService } from '../service/events.service';
import { DateFilterService } from '../service/date-filter.service';

@Component({
  selector: 'out-of-office-view',
  template: `
    <div class="main-container">
        <table class="data-table">
            <thead class="table-header">
                <tr>
                    <td scope="col" class="table-header-cell id-col">id</td>
                    <td scope="col" class="table-header-cell user-id-fk-col">user_id_fk</td>
                    <td scope="col" class="table-header-cell start-col">start</td>
                    <td scope="col" class="table-header-cell end-col">end</td>
                    <td scope="col" class="table-header-cell description-col">description</td>
                </tr>
            </thead>

            <tbody class="table-body">
                <tr *ngFor="let outOfOfficeEvent of outOfOfficeEventArray; let rowIndex=index">
                    <td class="table-body-cell id-col">{{outOfOfficeEvent.id}}</td>
                    <td class="table-body-cell user-id-fk-col">{{outOfOfficeEvent.user_id_fk}}</td>
                    <td class="table-body-cell start-col">{{outOfOfficeEvent.start}}</td>
                    <td class="table-body-cell end-col">{{outOfOfficeEvent.end}}</td>
                    <td class="table-body-cell description-col">{{outOfOfficeEvent.description}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  `,
  styles: [],
  styleUrls: ['./out-of-office-view.component.scss']
})
export class OutOfOfficeViewComponent implements OnInit
{
    protected outOfOfficeEventArray: Array<OutOfOfficeEvent>;

    public constructor(protected eventService: EventsService)
    {
        this.outOfOfficeEventArray = new Array<OutOfOfficeEvent>(5 * 5 * 4);
    }

    public ngOnInit(): void
    {
        this.eventService
            .getOutOfOfficeEventArrayObservable()
            .subscribe( (outOfOfficeEvents: Array<OutOfOfficeEvent>) =>
                {
                    this.outOfOfficeEventArray = outOfOfficeEvents;
                }
            );
    }
}
