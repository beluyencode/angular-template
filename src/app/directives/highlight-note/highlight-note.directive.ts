import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { document } from 'ngx-bootstrap/utils';
@Directive({
  selector: '[appHighlightNote]'
})

//
// Để sửa dụng phải đặt id cho element sử dụng directive này
//

export class HighlightNoteDirective implements OnInit, OnChanges {
  @Input() content: string;
  @Input() isEdit = true;
  @Input() specialVersion = false;
  @Output() changePosition = new EventEmitter<any>();
  @Input() arrHightlightNote: any;
  @Input() placeHolder = 'Comment...';
  divContentHTMl: ElementRef;
  divContentMenu: ElementRef;
  divNoteTextarea: ElementRef;
  Textarea: ElementRef;
  BtnHighlight: ElementRef;
  BtnNote: ElementRef;
  BtnClean: ElementRef;
  BtnCleanAll: ElementRef;
  idContentHtml;
  idContentMenu;
  idNoteTextarea;
  idTextarea;
  idBtnHighlight;
  idNote;
  idClean;
  idCleanALl;
  arrIdSpecialVersion: Array<any>;
  multiIdSpecial: Array<string> = [];
  position = {
    start: 0,
    end: 0
  };
  positionFixed = {
    x: 0,
    y: 0,
    id: ''
  };

  @HostListener('contextmenu', ['$event']) contextmenu(event) {
    if (this.isEdit) {
      event.preventDefault();
      if (event.target.parentElement.id === this.idContentMenu || event.target.parentElement.id === this.idNoteTextarea) {
        return;
      } else {
        const getSelection = document.getSelection();
        this.positionFixed.x = event.clientX;
        this.positionFixed.y = event.clientY;
        this.render.setStyle(this.divContentMenu, 'left', this.positionFixed.x + 'px');
        this.render.setStyle(this.divContentMenu, 'top', this.positionFixed.y + 'px');
        this.render.setStyle(this.divContentMenu, 'display', 'none');
        this.render.setStyle(this.divNoteTextarea, 'display', 'none');
        const getRangeAt = getSelection.getRangeAt(0);
        if (getRangeAt.toString() === ''
          || getRangeAt.commonAncestorContainer.parentElement.id === ''
          || getRangeAt.commonAncestorContainer.parentElement.id === this.ele.nativeElement.id
          || this.checkIdIncludeArrSelection(getRangeAt.commonAncestorContainer.parentElement.id).isInclude
          || this.ele.nativeElement.contains(getRangeAt.commonAncestorContainer)) {
          if (this.specialVersion && getRangeAt.toString() !== '' && !this.checkEleInRange(getSelection)) {
            this.render.setProperty(this.BtnHighlight, 'disabled', false);
            this.render.setProperty(this.BtnNote, 'disabled', false);
            this.position.start = getRangeAt.startOffset;
            this.position.end = getRangeAt.endOffset;
          } else {
            this.render.setProperty(this.BtnHighlight, 'disabled', true);
            this.render.setProperty(this.BtnNote, 'disabled', true);
          }
        } else {
          this.render.setProperty(this.BtnHighlight, 'disabled', false);
          this.render.setProperty(this.BtnNote, 'disabled', false);
          this.position.start = getSelection.anchorOffset;
          this.position.end = getSelection.focusOffset;
          this.positionFixed.id = event.target.id;
        }
        this.render.setStyle(this.divContentMenu, 'display', 'flex');
      }
    }
  }

  checkEleInRange(selection: any) {
    let booleanValue = false;
    this.arrIdSpecialVersion.forEach((item) => {
      item.id.forEach((id) => {
        if (document.getElementById(id) && selection.containsNode(document.getElementById(id), true)) {
          booleanValue = true;
        }
      });
    });
    return booleanValue;
  }

  @HostListener('mouseup', ['$event']) mouseup(event) {
    this.positionFixed.x = event.clientX;
    this.positionFixed.y = event.clientY;
    if (this.specialVersion) {
      // if (event.target.id !== this.idContentMenu) {
      //   this.render.setStyle(this.divContentMenu, 'display', 'none');
      // }
      // if (event.target.id !== this.idTextarea) {
      //   this.render.setStyle(this.divNoteTextarea, 'display', 'none');
      //   this.positionFixed.id = event.target.id;
      // }
      // const notePosition = this.includeArrIdSpecial(event.target.id);
      // if (notePosition.isInclude && this.arrIdSpecialVersion[notePosition.index].note) {
      //   this.render.setStyle(this.divNoteTextarea, 'left', this.positionFixed.x + 'px');
      //   this.render.setStyle(this.divNoteTextarea, 'top', this.positionFixed.y + 'px');
      //   this.render.setStyle(this.divNoteTextarea, 'display', 'block');
      //   this.render.setProperty(this.Textarea, 'value', this.arrIdSpecialVersion[notePosition.index].comment);
      // }
    } else {
      const selection = this.checkIdIncludeArrSelection(event.target.id);
      if (this.isEdit) {
        if (event.target.parentElement.id !== this.idContentMenu) {
          this.render.setStyle(this.divContentMenu, 'display', 'none');
        }
      }
      if (event.target.parentElement.id !== this.idNoteTextarea) {
        this.render.setStyle(this.divNoteTextarea, 'display', 'none');
      }
      if (selection.isInclude && this.arrHightlightNote[selection.index].comment !== undefined) {
        this.positionFixed.id = event.target.id;
        if (this.isEdit) {
          this.render.setStyle(this.divContentMenu, 'display', 'none');
        }
        this.render.setStyle(this.divNoteTextarea, 'left', this.positionFixed.x + 'px');
        this.render.setStyle(this.divNoteTextarea, 'top', this.positionFixed.y + 'px');
        this.render.setStyle(this.divNoteTextarea, 'display', 'block');
        if (this.isEdit) {
          this.render.setProperty(this.Textarea, 'value', this.arrHightlightNote[selection.index].comment);
        } else {
          this.render.setProperty(this.Textarea, 'innerHTML', this.arrHightlightNote[selection.index].comment);
        }
      }
    }
  }

  @HostListener('window:click', ['$event']) documentCLick(event) {
    if (this.specialVersion) {
      this.positionFixed.x = event.clientX;
      this.positionFixed.y = event.clientY;
      if (event.target.parentElement?.id !== this.idContentMenu) {
        this.render.setStyle(this.divContentMenu, 'display', 'none');
      }
      const boolean = event.target.id === this.idBtnHighlight || event.target.id === this.idNote;
      if (!boolean) {
        if (event.target.id !== this.idTextarea) {
          this.positionFixed.id = event.target.id;
        }
        if (event.target.parentElement) {
          if (event.target.parentElement.id !== this.idNoteTextarea && !this.includeArrIdSpecial(event.target.id).isInclude) {
            this.render.setStyle(this.divNoteTextarea, 'display', 'none');
          }
        }
      }
      const notePosition = this.includeArrIdSpecial(event.target.id);
      if (notePosition.isInclude && this.arrIdSpecialVersion[notePosition.index].note) {
        event.preventDefault();
        this.render.setStyle(this.divNoteTextarea, 'left', this.positionFixed.x + 'px');
        this.render.setStyle(this.divNoteTextarea, 'top', this.positionFixed.y + 'px');
        this.render.setStyle(this.divNoteTextarea, 'display', 'block');
        this.render.setProperty(this.Textarea, 'value', this.arrIdSpecialVersion[notePosition.index].comment);
        this.render.selectRootElement(this.Textarea).focus();
      }
    } else {
      if (this.isEdit) {
        if (event.target.parentElement.id !== this.idContentMenu) {
          this.render.setStyle(this.divContentMenu, 'display', 'none');
        }
      }
      if (event.target.parentElement.id !== this.idNoteTextarea && !this.checkIdIncludeArrSelection(event.target.id).isInclude) {
        this.render.setStyle(this.divNoteTextarea, 'display', 'none');
      }
    }
  }

  constructor(private ele: ElementRef, private render: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.content?.previousValue) {
      this.content = changes.content.currentValue;
      this.checkArrPosition();
      this.changeContentHtml();
    }
  }

  ngOnInit(): void {
    if (this.specialVersion) {
      this.isEdit = true;
      this.arrIdSpecialVersion = [];
    }
    if (this.isEdit) {
      this.idContentHtml = this.ele.nativeElement.id + 'contentHTML';
      this.idContentMenu = this.ele.nativeElement.id + 'contentMenu';
      this.idBtnHighlight = this.ele.nativeElement.id + 'highlight';
      this.idNote = this.ele.nativeElement.id + 'note';
      this.idClean = this.ele.nativeElement.id + 'clean';
      this.idNoteTextarea = this.ele.nativeElement.id + 'noteTextarea';
      this.idTextarea = this.ele.nativeElement.id + 'textarea';
      this.idCleanALl = this.ele.nativeElement.id + 'cleanALl';
      this.checkArrPosition();
      this.render.appendChild(this.ele.nativeElement, this.createViewContent());
      this.changeContentHtml();
      this.render.appendChild(this.ele.nativeElement, this.createViewContentMenu());
      this.render.appendChild(this.ele.nativeElement, this.createViewNote());
    } else {
      this.idContentHtml = this.ele.nativeElement.id + 'contentHTML';
      this.idNoteTextarea = this.ele.nativeElement.id + 'noteTextarea';
      this.idTextarea = this.ele.nativeElement.id + 'textarea';
      this.checkArrPosition();
      this.render.appendChild(this.ele.nativeElement, this.createViewContent());
      this.changeContentHtml();
      this.render.appendChild(this.ele.nativeElement, this.createViewNote());
    }
    if (this.isEdit) {
      this.render.listen(window, 'scroll', () => {
        this.render.setStyle(this.divContentMenu, 'display', 'none');
        this.render.setStyle(this.divNoteTextarea, 'display', 'none');
      });
    } else {
      if (document.getElementById('detail')) {
        this.render.listen(document.getElementById('detail'), 'scroll', () => {
          this.render.setStyle(this.divNoteTextarea, 'display', 'none');
        });
      }
      if (document.getElementById('page-scroll')) {
        this.render.listen(document.getElementById('page-scroll'), 'scroll', () => {
          this.render.setStyle(this.divNoteTextarea, 'display', 'none');
        });
      }
    }
  }

  ObjectId(m = Math, d = Date, h = 16, s = (sELe: any) => m.floor(sELe).toString(h)) {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
  }

  createViewContent() {
    this.divContentHTMl = this.render.createElement('div');
    this.render.setAttribute(this.divContentHTMl, 'id', this.idContentHtml);
    return this.divContentHTMl;
  }

  createViewNote() {
    this.divNoteTextarea = this.render.createElement('div');
    this.render.setAttribute(this.divNoteTextarea, 'id', this.idNoteTextarea);
    this.render.addClass(this.divNoteTextarea, 'popupNote');
    if (this.isEdit) {
      this.Textarea = this.render.createElement('textarea');
      this.render.setAttribute(this.Textarea, 'id', this.idTextarea);
      this.render.setAttribute(this.Textarea, 'rows', '4');
      this.render.setAttribute(this.Textarea, 'cols', '30');
      this.render.setAttribute(this.Textarea, 'placeholder', this.placeHolder);
      this.render.listen(this.Textarea, 'keyup', (event) => {
        this.keyUpOnTextarea(event);
      });
      this.render.appendChild(this.divNoteTextarea, this.Textarea);
    } else {
      this.Textarea = this.render.createElement('div');
      this.render.setAttribute(this.Textarea, 'id', this.idTextarea);
      this.render.appendChild(this.divNoteTextarea, this.Textarea);
    }
    return this.divNoteTextarea;
  }

  keyUpOnTextarea(event) {
    if (this.specialVersion) {
      const noteIndex = this.includeArrIdSpecial(this.positionFixed.id);
      if (noteIndex.isInclude && this.arrIdSpecialVersion[noteIndex.index].note) {
        this.arrIdSpecialVersion[noteIndex.index].comment = event.target.value;
      }
    } else {
      const selection = this.checkIdIncludeArrSelection(this.positionFixed.id);
      if (selection.isInclude && this.arrHightlightNote[selection.index].comment !== undefined) {
        this.arrHightlightNote[selection.index].comment = event.target.value;
        this.saveArrPosition();
      }
    }
  }

  createViewContentMenu() {
    this.divContentMenu = this.render.createElement('div');
    this.render.setAttribute(this.divContentMenu, 'id', this.idContentMenu);
    this.render.addClass(this.divContentMenu, 'noselect');
    this.BtnHighlight = this.render.createElement('button');
    this.render.setAttribute(this.BtnHighlight, 'id', this.idBtnHighlight);
    this.render.listen(this.BtnHighlight, 'click', () => {
      this.highlight(false);
    });
    this.render.appendChild(this.BtnHighlight, this.render.createText('Highlight'));
    this.BtnNote = this.render.createElement('button');
    this.render.setAttribute(this.BtnNote, 'id', this.idNote);
    this.render.listen(this.BtnNote, 'click', () => {
      this.note();
    });
    this.render.appendChild(this.BtnNote, this.render.createText('Note'));
    this.BtnClean = this.render.createElement('button');
    this.render.setAttribute(this.BtnClean, 'id', this.idClean);
    this.render.listen(this.BtnClean, 'click', () => {
      this.clean();
    });
    this.render.appendChild(this.BtnClean, this.render.createText('Clear'));
    this.BtnCleanAll = this.render.createElement('button');
    this.render.setAttribute(this.BtnCleanAll, 'id', this.idCleanALl);
    this.render.listen(this.BtnCleanAll, 'click', () => {
      this.cleanAll();
    });
    this.render.appendChild(this.BtnCleanAll, this.render.createText('Clear All'));
    this.render.addClass(this.divContentMenu, 'popupOnRightClick');
    this.render.addClass(this.BtnHighlight, 'buttonFirst');
    this.render.addClass(this.BtnCleanAll, 'buttonEnd');
    this.render.appendChild(this.divContentMenu, this.BtnHighlight);
    this.render.appendChild(this.divContentMenu, this.BtnNote);
    this.render.appendChild(this.divContentMenu, this.BtnClean);
    this.render.appendChild(this.divContentMenu, this.BtnCleanAll);
    return this.divContentMenu;
  }

  checkArrPosition() {
    if (!this.arrHightlightNote || this.arrHightlightNote === null) {
      this.arrHightlightNote = [{
        start: 0,
        end: 0,
        isfirst: true
      }];
    }
  }

  changeContentHtml() {
    if (this.arrHightlightNote.length === 1) {
      if (this.specialVersion) {
        this.render.setProperty(this.divContentHTMl, 'innerHTML', '');

      } else {
        this.render.setProperty(this.divContentHTMl, 'innerHTML', this.content);
      }
    } else {
      let contentHtml = '';
      const arrContent = this.content.split('');
      arrContent.forEach((ele, eleIndex) => {
        for (let index = 1; index < this.arrHightlightNote.length; index++) {
          if (this.arrHightlightNote[index].comment !== undefined) {
            if (eleIndex === this.arrHightlightNote[index].start) {
              contentHtml += `<span id=${this.arrHightlightNote[index].id} style="border: 1px solid black; cursor: pointer; background-color: yellow; color: black;">`;
              break;
            }
            if (eleIndex === this.arrHightlightNote[index].end) {
              contentHtml += '</span>';
              break;
            }
          } else {
            if (eleIndex === this.arrHightlightNote[index].start) {
              contentHtml += `<span style="background-color: yellow; color: black;" id=${this.arrHightlightNote[index].id}>`;
              break;
            }
            if (eleIndex === this.arrHightlightNote[index].end) {
              contentHtml += '</span>';
              break;
            }
          }
        }
        contentHtml += ele;
      });
      this.render.setProperty(this.divContentHTMl, 'innerHTML', contentHtml);
    }
  }

  getPosition() {
    let positionSelection = 0;
    let elementHtml: any = [];
    let positionSelectionInelementHtml: any = [];
    elementHtml = Array.from(window.getSelection().getRangeAt(0).startContainer.parentNode.childNodes);
    positionSelectionInelementHtml = Array.from(elementHtml).map(ele =>
      ele === document.getSelection().getRangeAt(0).startContainer
    );
    for (let index = 0; index < elementHtml.length; index++) {
      if (elementHtml[index].constructor.name === 'HTMLSpanElement') {
        positionSelection++;
      }
      if (positionSelectionInelementHtml[index]) {
        break;
      }
    }
    if (!this.checkTrueFasleArr(positionSelectionInelementHtml)) {
      return -1;
    }
    return positionSelection;
  }

  checkTrueFasleArr(array) {
    let boolean = false;
    array.forEach(ele => {
      if (ele) {
        boolean = ele;
      }
    });
    return boolean;
  }

  checkIdIncludeArrSelection(id) {
    const element: any = {
      isInclude: false
    };
    this.arrHightlightNote?.forEach((ele, index) => {
      if (ele.id === id) {
        element.isInclude = true;
        element.index = index;
      }
    });
    return element;
  }

  sortArrPostion() {
    this.arrHightlightNote?.sort((a, b) => {
      return a.start - b.start;
    });
    const arrEle = [];
    this.arrHightlightNote?.forEach((ele, index) => {
      if (index > 1 && this.arrHightlightNote[index - 1].end >= ele.start - 1) {
        arrEle[index - 1].end += this.position.end + 1;
      } else {
        arrEle.push(ele);
      }
    });
    this.arrHightlightNote = arrEle;
  }

  saveArrPosition() {
    this.changePosition.emit(this.arrHightlightNote);
  }

  addPosition(positionSelection, comment?: boolean) {
    const id = this.ObjectId();
    const pushData: any = {
      start: this.position.start + this.arrHightlightNote[positionSelection].end,
      end: this.position.end + this.arrHightlightNote[positionSelection].end,
      id: id
    };
    if (pushData.end < pushData.start) {
      const temp = pushData.start;
      pushData.start = pushData.end;
      pushData.end = temp;
    }
    if (comment) {
      pushData.comment = '';
      this.positionFixed.id = id;
    }
    this.arrHightlightNote.push(pushData);
    this.sortArrPostion();
  }

  highlight(highlightNote?: boolean) {
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    if (this.specialVersion) {
      if (selection.getRangeAt(0).commonAncestorContainer.constructor.name !== 'Text') {
        this.multiIdSpecial = [];
        const arrTextELe = [];
        const arrNode = Array.from(selection.getRangeAt(0).commonAncestorContainer.childNodes).filter(ele => selection.containsNode(ele, true));
        arrNode.forEach(ele => {
          this.recursiveFindChildELe(ele, arrTextELe, highlightNote);
        });
        arrTextELe.forEach((eleText, eleTextIndex) => {
          if (eleTextIndex === 0) {
            if (range.startContainer.constructor.name === 'Text') {
              eleText.replaceWith(this.createSpanHightLightWithStartOrEnd(eleText.textContent, highlightNote, range.startOffset, true));
            } else {
              if (arrTextELe.length === 1) {
                eleText.replaceWith(this.createSpanHightLightWithStartOrEnd(eleText.textContent, highlightNote));
              } else {
                range.startContainer.childNodes.forEach((ele, index) => {
                  if (index > range.startOffset) {
                    if (ele.contains(eleText)) {
                      eleText.replaceWith(this.createSpanHightLightWithStartOrEnd(eleText.textContent, highlightNote));
                    }
                  }
                });
              }
            }
          } else if (eleTextIndex === arrTextELe.length - 1) {
            if (range.endContainer.constructor.name === 'Text') {
              eleText.replaceWith(this.createSpanHightLightWithStartOrEnd(eleText.textContent, highlightNote, range.endOffset - 1, false));
            } else {
              if (range.endContainer.contains(eleText)) {
              } else {
                eleText.replaceWith(this.createSpanHightLightWithStartOrEnd(eleText.textContent, highlightNote));
              }
            }
          } else {
            eleText.replaceWith(this.createSpanHightLightWithStartOrEnd(eleText.textContent, highlightNote));
          }
        });
        this.arrIdSpecialVersion.push({ id: this.multiIdSpecial, note: highlightNote, comment: '' });
      } else {
        const newSpan = this.render.createElement('span');
        const id = this.ObjectId();
        this.arrIdSpecialVersion.push({ id: [id], note: highlightNote, comment: '' });
        if (highlightNote) {
          this.render.addClass(newSpan, 'noteText');
        } else {
          this.render.addClass(newSpan, 'highLightText');

        }
        this.render.setAttribute(newSpan, 'id', id);
        selection.getRangeAt(0).surroundContents(newSpan);
      }
    } else {
      const position = this.getPosition();
      this.addPosition(position);
      this.saveArrPosition();
      this.changeContentHtml();
    }
    document.getSelection().empty();
    this.render.setStyle(this.divContentMenu, 'display', 'none');
  }

  // startOrEnd : true tính vị trí từ điểm position tới cuối / false tính vị trí từ điểm đàu tiên đến posiotion / undefined lấy all
  createSpanHightLightWithStartOrEnd(contentText: string, highlightNote: boolean, position?: number, startOrEnd?: boolean) {
    const newEle = this.render.createElement('tag-no-name');
    const arrContent = contentText.split('');
    let classCSS = 'highLightText';
    if (highlightNote) {
      classCSS = 'noteText';
    }
    let newContent = '';
    const id = this.ObjectId();
    this.multiIdSpecial.push(id);
    if (startOrEnd && position !== undefined) {
      arrContent.forEach((ele, index) => {
        if (index === position) {
          newContent += `<span class="${classCSS}" id="${id}">`;
        }
        newContent += ele;
        if (index === arrContent.length - 1) {
          newContent += '</span>';
        }
      });
    } else if (startOrEnd === false && position !== undefined) {
      arrContent.forEach((ele, index) => {
        if (index === 0) {
          newContent += `<span class="${classCSS}"  id="${id}">`;
        }
        newContent += ele;
        if (index === position) {
          newContent += '</span>';
        }
      });
    } else {
      arrContent.forEach((ele, index) => {
        if (index === 0) {
          newContent += `<span class="${classCSS}"  id="${id}">`;
        }
        newContent += ele;
        if (index === arrContent.length - 1) {
          newContent += '</span>';
        }
      });
    }
    this.render.setProperty(newEle, 'innerHTML', newContent);
    return newEle;

  }

  recursiveFindChildELe(node, arr: Array<any>, highlightNote?: boolean) {
    const selection = document.getSelection();
    const parentGeneralConditions = node.constructor.name === 'Text' && node.textContent.trim().length > 0;
    if (parentGeneralConditions && selection.containsNode(node, true)) {
      arr.push(node);
      return;
    } else if (node.childNodes.length > 0) {
      node.childNodes.forEach(eleChild => {
        const generalConditions = eleChild.constructor.name === 'Text' && eleChild.textContent.trim().length > 0;
        if (generalConditions && selection.containsNode(eleChild, true)) {
          arr.push(eleChild);
        } else {
          this.recursiveFindChildELe(eleChild, arr, highlightNote);
        }
      });
      return;
    } else {
      return;
    }
  }

  note() {
    if (this.specialVersion) {
      this.render.setStyle(this.divContentMenu, 'display', 'none');
      this.render.setProperty(this.Textarea, 'value', '');
      this.render.setStyle(this.divNoteTextarea, 'left', this.divContentMenu['style'].left);
      this.render.setStyle(this.divNoteTextarea, 'top', this.divContentMenu['style'].top);
      this.render.setStyle(this.divNoteTextarea, 'display', 'block');
      this.highlight(true);
      this.render.selectRootElement(this.Textarea).focus();
      this.positionFixed.id = this.arrIdSpecialVersion[this.arrIdSpecialVersion.length - 1].id[0];
    } else {
      const position = this.getPosition();
      this.render.setProperty(this.Textarea, 'value', '');
      this.addPosition(position, true);
      this.saveArrPosition();
      this.render.setStyle(this.divContentMenu, 'display', 'none');
      this.render.setStyle(this.divNoteTextarea, 'left', this.divContentMenu['style'].left);
      this.render.setStyle(this.divNoteTextarea, 'top', this.divContentMenu['style'].top);
      this.render.setStyle(this.divNoteTextarea, 'display', 'block');
      this.changeContentHtml();
    }
  }

  clean() {
    if (this.specialVersion) {
      const selection = document.getSelection().getRangeAt(0);
      const includeArrId = this.includeArrIdSpecial(selection.commonAncestorContainer.parentNode.id);
      if (includeArrId.isInclude) {
        this.arrIdSpecialVersion[includeArrId.index].id.forEach(ele => {
          const elementHtml = document.getElementById(ele);
          if (elementHtml) {
            elementHtml.outerHTML = elementHtml.outerText;
          }
        });
        this.arrIdSpecialVersion.splice(includeArrId.index, 1);
      }
    } else {
      const positionSelection = this.checkIdIncludeArrSelection(document.getSelection().getRangeAt(0).commonAncestorContainer.parentNode.id);
      if (positionSelection.isInclude) {
        if (this.arrHightlightNote[positionSelection.index].comment !== undefined) {
          this.render.listen(document.getElementById(this.arrHightlightNote[positionSelection.index].id), 'click', () => { });
        }
        this.arrHightlightNote.splice(positionSelection.index, 1);
        this.saveArrPosition();
        this.changeContentHtml();
      }
    }
    this.render.setStyle(this.divContentMenu, 'display', 'none');
  }

  includeArrIdSpecial(id: string) {
    let booleanValue = false;
    let position = -1;
    this.arrIdSpecialVersion.forEach((ele, index) => {
      ele.id.forEach(eleChild => {
        if (id === eleChild) {
          booleanValue = true;
          position = index;
        }
      });
    });
    return { isInclude: booleanValue, index: position };
  }

  cleanAll() {
    if (this.specialVersion) {
      this.render.setStyle(this.divContentMenu, 'display', 'none');
      this.cleanAllSpecial();
      this.arrIdSpecialVersion = [];
    } else {
      this.arrHightlightNote.forEach(element => {
        if (element.comment !== undefined) {
          this.render.listen(document.getElementById(element.id), 'click', () => { });
        }
      });
      this.arrHightlightNote = [{
        start: 0,
        end: 0,
        isfirst: true
      }];
      this.saveArrPosition();
      this.changeContentHtml();
      this.render.setStyle(this.divContentMenu, 'display', 'none');
    }
  }

  cleanAllSpecial() {
    this.arrIdSpecialVersion.forEach(item => {
      item.id.forEach(id => {
        const ele = document.getElementById(id);
        if (ele) {
          ele.outerHTML = ele.outerText;
        }
      });
    });
    [...document.getElementsByTagName('TAG-NO-NAME')].forEach(ele => {
      ele.outerHTML = ele.textContent;
    });
  }
}


