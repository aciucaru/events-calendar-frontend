import { Component } from '@angular/core';

@Component({
  selector: 'main-ui',
  template: `
    <div class="main-container">
        <top-toolbar></top-toolbar>
        <hosted-appointment-view></hosted-appointment-view>
    </div>
  `,
  styles: [],
  styleUrls: ['./main-ui.component.scss']
})
export class MainUiComponent
{

}
