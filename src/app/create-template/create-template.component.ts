import { Component, OnInit } from '@angular/core';
import { CreateTemplateService } from './create-template.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {
  listElement: any = [
    {
      "name": "Ông/Bà :",
      "id": "63a4226a7611a8963af46677",
      "color": "",
      "fontSize": "25",
      "content": "Ông/Bà :",
      "textAlignment": "left",
      "width": null,
      "position": {
        "top": 259,
        "left": 236
      }
    },
    {
      "name": "Phạm Việt Long",
      "id": "63a4226a679bdd171ee94dd2",
      "color": "",
      "fontSize": "25",
      "content": "Phạm Việt Long",
      "textAlignment": "left",
      "width": null,
      "position": {
        "top": 257,
        "left": 366
      }
    },
    {
      "name": "Ngày sinh: ",
      "id": "63a4226b6d450c9857b96623",
      "color": "",
      "fontSize": "25",
      "content": "Ngày sinh: ",
      "textAlignment": "left",
      "width": null,
      "position": {
        "top": 306,
        "left": 237
      }
    },
    {
      "name": "21/01/2002",
      "id": "63a4231f1ed7c63557b3840e",
      "color": "",
      "fontSize": "25",
      "content": "21/01/2002",
      "textAlignment": "left",
      "width": null,
      "position": {
        "top": 306,
        "left": 366
      }
    },
    {
      "name": "Khen thưởng",
      "id": "63a42347fdfc25ea736fd9e3",
      "color": "",
      "fontSize": "25",
      "width": "700",
      "textAlignment": "center",
      "content": "Đã đạt thành tích thành tích xuất sắc trong quá trình học tập. Góp phần giúp đất nước ta sánh vai với các cường quốc năm châu.",
      "position": {
        "top": 371,
        "left": 80
      }
    }
  ]
  popupEdit: any = {
    isOpen: false,
    data: null
  }

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
    })
  }

  addElement() {
    this.listElement.push({
      name: 'element ' + this.listElement.length,
      id: this.createTemplateService.ObjectId(),
      color: '',
      fontSize: 20,
      width: 0,
      TextAlignment: 'left',
      content: 'element ' + this.listElement.length,
      position: {
        top: 0,
        left: 0
      }
    });
  }

  deleteElement(ele: any) {
    this.listElement = this.listElement.filter((elePrev: any) => elePrev.id !== ele.id)
  }

  editElement(ele: any) {
    console.log(ele);
    this.popupEdit = {
      isOpen: true,
      data: {
        ...ele
      }
    }
    // this.modalService.openModal(this.idEditPopup)
  }

  closePopup() {
    this.popupEdit = {
      isOpen: false,
      data: null
    }
  }

  save() {
    this.listElement = this.listElement.map((ele: any) => {
      if (ele.id === this.popupEdit.data.id) {
        return this.popupEdit.data;
      }
      return ele;
    })
    console.log(this.listElement);

    this.closePopup();
  }
}
