import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-writing-ai-explain',
  templateUrl: './writing-ai-explain.component.html',
  styleUrls: ['./writing-ai-explain.component.scss']
})
export class WritingAiExplainComponent {
  @Input() vocabulary = '';
  tab = 0;

  changeTab(tabId: number) {
    if (this.tab === tabId) {
      this.tab = 0;
    } else {
      this.tab = tabId;
    }
  }

}
