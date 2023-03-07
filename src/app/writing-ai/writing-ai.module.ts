import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WritingAiComponent } from './writing-ai.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WritingAiExplainComponent } from './writing-ai-explain/writing-ai-explain.component';
import { WritingAiLineComponent } from './writing-ai-line/writing-ai-line.component';
import { WritingAiCharComponent } from './writing-ai-line/writing-ai-char/writing-ai-char.component';




@NgModule({
  declarations: [
    WritingAiExplainComponent,
    WritingAiComponent,
    WritingAiLineComponent,
    WritingAiCharComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    WritingAiComponent
  ]
})
export class WritingAiModule { }
