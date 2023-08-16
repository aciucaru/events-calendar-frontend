import { Component } from '@angular/core';

@Component({
  selector: 'main-ui',
  template: `
    <div class="main-container">
        <top-toolbar></top-toolbar>
        <!-- <hosted-appointment-view></hosted-appointment-view> -->
        <invitations-view></invitations-view>
        <tab-panel>
            <tab-item>A</tab-item>
            <tab-item>B</tab-item>
            <tab-item>C</tab-item>
            <tab-item>D</tab-item>
        </tab-panel>
    </div>
  `,
  styles: [],
  styleUrls: ['./main-ui.component.scss']
})
export class MainUiComponent
{

}
