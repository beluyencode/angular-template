import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StandaloneComponent } from './standalone/standalone.component';
import { HighlightNoteV2Module } from './directives/highlight-note-v2/highlight-note-v2.module';
import { RouterModule, Routes } from '@angular/router';
import { HighlightNoteComponent } from './components/highlight-note/highlight-note.component';
import { CreateTemplateComponent } from './create-template/create-template.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'highlight-note',
        component: HighlightNoteComponent
      },
      {
        path: 'create-template',
        component: CreateTemplateComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HighlightNoteComponent,
  ],
  imports: [
    BrowserModule,
    StandaloneComponent,
    HighlightNoteV2Module,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
