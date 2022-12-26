import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
// import { jsPDF } from "jspdf";
import { fakeData, selectTextAlignment, selectTypeElement, selectTypeParams } from './create-template';
import { CreateTemplateService } from './create-template.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {
  listElement: any = fakeData.data;
  background = fakeData.background;
  popupEdit: any = {
    isOpen: false,
    data: null
  };
  popupEditBackground: any = {
    isOpen: false,
    data: null
  };
  selectTypeElement = selectTypeElement;
  selectTextAlignment = selectTextAlignment;
  selectTypeParams = selectTypeParams;

  constructor(
    private createTemplateService: CreateTemplateService,
  ) {

  }

  ngOnInit(): void {

  }

  changeElement(event: any) {
    this.listElement = this.listElement.map((ele: any) => {
      if (ele.id === event.id) {
        return event;
      }
      return ele;
    });
  }

  addElement() {
    this.listElement.push({
      name: 'element ' + this.listElement.length,
      id: this.createTemplateService.ObjectId(),
      color: '',
      fontSize: 20,
      width: 0,
      type: 'text',
      textAlignment: 'left',
      image: null,
      content: 'element ' + this.listElement.length,
      position: {
        top: 0,
        left: 0
      }
    });
  }

  deleteElement(ele: any) {
    this.listElement = this.listElement.filter((elePrev: any) => elePrev.id !== ele.id);
  }

  editElement(ele: any) {
    this.popupEdit = {
      isOpen: true,
      data: {
        ...ele
      }
    };
    // this.modalService.openModal(this.idEditPopup)
  }

  editBackground() {
    this.popupEditBackground = {
      isOpen: true,
      data: {
        image: this.background
      }
    };
  }

  closePopup() {
    this.popupEdit = {
      isOpen: false,
      data: null
    };
    this.popupEditBackground = {
      isOpen: false,
      data: null
    };
  }

  saveEdit() {
    this.listElement = this.listElement.map((ele: any) => {
      if (ele.id === this.popupEdit.data.id) {
        return this.popupEdit.data;
      }
      return ele;
    });
    this.closePopup();
  }

  dropFile(event: any, type: string) {
    event.preventDefault();
    event.stopPropagation();
    const listFiles = new DataTransfer();
    listFiles.items.add(event.dataTransfer.files[0]);
    this.convertImgToBase64(event.dataTransfer.files[0]).then((data: any) => {
      switch (type) {
        case 'element':
          this.popupEdit.data.image = data;
          break;
        case 'background':
          this.popupEditBackground.data.image = data;
          break;
        default:
          break;
      }
    });
  }

  chooseFile(event: any, type: string) {
    event.preventDefault();
    event.stopPropagation();
    const listFiles = new DataTransfer();
    listFiles.items.add(event.target.files[0]);
    this.convertImgToBase64(event.target.files[0]).then((data: any) => {
      switch (type) {
        case 'element':
          this.popupEdit.data.image = data;
          break;
        case 'background':
          this.popupEditBackground.data.image = data;
          break;
        default:
          break;
      }
    });

  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  convertImgToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({
        data: reader.result,
        name: file.name
      });
      reader.onerror = error => reject(error);
    });
  }
  convertBase64tofile(data: any) {
    const listFiles = new DataTransfer();
    if (data) {
      const blob = new Blob([data.data]);
      const file = new File([blob], data.name);
      listFiles.items.add(file);
    }
    return listFiles.files;
  }

  saveToPDF() {
    console.log(this.listElement);
    const source = document.getElementById('view-pdf');
    html2canvas(source).then((canvas) => {
      const url = canvas.toDataURL();
      const link = document.createElement('a');
      link.download = 'test.png';
      link.href = url;
      link.click();
      // const doc = new jsPDF();
      // doc.addImage(url, 'PNG', 0, 10, 210, 160);
      // doc.save("new.pdf");
    });
  }

  saveEditBackground() {
    this.background = this.popupEditBackground.data.image;
    this.closePopup();
  }
}
