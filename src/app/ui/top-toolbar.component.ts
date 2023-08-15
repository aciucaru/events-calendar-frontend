import { Component } from '@angular/core';

@Component({
  selector: 'top-toolbar',
  template: `
    <div class="main-container">
        <user-selector></user-selector>
        <date-selector></date-selector>
    </div>
  `,
  styles: [],
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent
{

}
