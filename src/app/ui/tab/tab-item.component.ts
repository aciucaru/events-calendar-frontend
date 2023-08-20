import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'tab-item',
  template: `
    <div class="main-container">
        <div>Tab {{tabName}}</div>
    </div>
  `,
  styles: [],
  styleUrls: ['./tab-panel.component.scss']
})
export class TabItemComponent
{
    @Input() tabName?: string = "tab";
    @Input() templateRef!: TemplateRef<any>;
    @Input() isActive: boolean = false;
}
