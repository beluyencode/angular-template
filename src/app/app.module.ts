import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateTemplateModule } from './create-template/create-template.module';
import { StandaloneComponent } from './standalone/standalone.component';
import { HighlightNoteModule } from './directives/highlight-note/highlight-note.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CreateTemplateModule,
    StandaloneComponent,
    HighlightNoteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
