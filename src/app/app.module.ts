import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateTemplateModule } from './create-template/create-template.module';
import { StandaloneComponent } from './standalone/standalone.component';
import { WritingAiModule } from './writing-ai/writing-ai.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CreateTemplateModule,
    WritingAiModule,
    StandaloneComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
