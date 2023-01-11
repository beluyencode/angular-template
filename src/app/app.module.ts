import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateTemplateModule } from './create-template/create-template.module';
import { WritingAiModule } from './writing-ai/writing-ai.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CreateTemplateModule,
    WritingAiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
