import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item.component';

@Component({
  selector: 'tab-panel',
  template: `
    <div class="main-container">
        <div class="tab-buttons-container">
            <button [ngClass]="{active: tab == activeComponent}"
            *ngFor="let tab of tabArray"
            (click)="activateTab">
                {{tab.tabName}}
            </button>
        </div>
        <div class="tab-content">
            
        </div>
    </div>
  `,
  styles: [],
  styleUrls: ['./tab-panel.component.scss']
})
export class TabPanelComponent
{
    @ContentChildren(TabItemComponent) tabArray!: QueryList<TabItemComponent>;
    activeComponent!: TabItemComponent;
    activeTabIndex: number = 0;

    // protected ngAfterContentInit()
    // {
    //     this.activeTabIndex = 0;
    // }

    protected activateTab(tabIndex: number)
    {
        this.activeTabIndex = tabIndex;
        console.log(`tab activated: ${tabIndex}`);
    }

}
