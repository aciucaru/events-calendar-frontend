import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';



@Component({
  selector: 'user-selector',
  template: `
    <div class="main-container">
        <p-dropdown [options]="cities"
            [ngModel]="selectedCity"
            (ngModel)="selectedCity($event)"
            optionLabel="name">
        </p-dropdown>
        <!-- <p-dropdown [options]="cities" optionLabel="name"></p-dropdown> -->
    </div>
  `,
  styles: []
})
export class UserSelectorComponent
{
    public cities: Array<string> =
    [
        "New York",
        "Paris",
        "Madrid"
    ];

    public selectedCity: any;

    public selecetdCity(event: any)
    {
        console.log("dropdown");
    }
}
