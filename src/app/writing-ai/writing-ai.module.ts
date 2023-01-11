import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WritingAiComponent } from './writing-ai.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WritingAiExplainComponent } from './writing-ai-explain/writing-ai-explain.component';



@NgModule({
  declarations: [
    WritingAiComponent,
    WritingAiExplainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ], exports: [
    WritingAiComponent,
    WritingAiExplainComponent
  ]
})
export class WritingAiModule { }
