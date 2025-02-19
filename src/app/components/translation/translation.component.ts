import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {
  @ViewChild('viewer') viewer: ElementRef;
  fileOrigin: File;
  fileTranslation: File;
  viewDocx: boolean = false;

  constructor(private http: HttpClient) { }

  onChangeOriginFile(event: any) {
    this.fileOrigin = event.target.files[0];
  }

  onChangeTranslationFile(event: any) {
    this.fileTranslation = event.target.files[0];
  }

  viewDocxFile() {
    if (this.fileOrigin && this.fileTranslation) {
      const formData = new FormData();
      formData.append('fileOrigin', this.fileOrigin);
      formData.append('fileTranslation', this.fileTranslation);
      this.http.post('http://localhost:3000/convert', 
        formData, 
      ).subscribe((res: any) => {
        console.log(res);
        this.viewDocx = true;
        WebViewer({
          path: "../../assets/lib",
          enableOfficeEditing: true,
          initialDoc: "http://localhost:3000/" + res.path,
        }, this.viewer.nativeElement).then((instance) => {
  
        });
      });
    
    }
  }
}
