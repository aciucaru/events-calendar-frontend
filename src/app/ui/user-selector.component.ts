import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'user-selector',
  template: `
    <div class="main-container">
        <select #userSelect class="col-info-select" [value]="selectedCity"
            (change)="selectUser(userSelect.value)">
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="bool">bool</option>
        </select>
    </div>
  `,
  styles: []
})
export class UserSelectorComponent implements OnInit
{
    public cities: Array<string> = [];

    public selectedCity: any;

    public ngOnInit(): void
    {
        this.cities =
        [
            "New York",
            "Paris",
            "Madrid"
        ];
    }

    public selectUser(event: any)
    {
        console.log("dropdown");
    }
}
