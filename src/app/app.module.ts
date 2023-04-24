import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateTemplateModule } from './create-template/create-template.module';
import { StandaloneComponent } from './standalone/standalone.component';
import { HighlightNoteV2Module } from './directives/highlight-note-v2/highlight-note-v2.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CreateTemplateModule,
    StandaloneComponent,
    HighlightNoteV2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
