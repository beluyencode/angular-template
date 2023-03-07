import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CheckGrammarFeedbackType } from './writing-ai';
import { WritingAiService } from './writing-ai.service';

@Component({
  selector: 'app-writing-ai',
  templateUrl: './writing-ai.component.html',
  styleUrls: ['./writing-ai.component.scss']
})
export class WritingAiComponent implements OnInit {
  @ViewChild('writingResults') ele: ElementRef;
  @Input() dataUserText: any;
  @Output() saveAnswer = new EventEmitter<string>();
  loading = false;
  dataGrammar: any;
  context: any = '';
  data: any = [];
  arrayChar: any = [];
  wordCount = 0;
  grammarError = 0;
  spellingErros = 0;

  constructor(
    private writingAiService: WritingAiService,
  ) { }

  ngOnInit(): void {
    this.context = this.dataUserText ? this.dataUserText : '';
    if (this.context !== '') {
      this.writingAiService.checkGrammar(this.context).subscribe(res => {
        this.dataGrammar = res;
      });
    }
    this.changeContentAnswer();
  }

  changeContentAnswer() {
    this.arrayChar = [];
    this.data = this.convertResData(this.dataGrammar?.data?.check_grammar_feedback);
    let text: any = this.context;
    if (this.data.length > 0) {
      this.data.forEach(ele => {
        // tslint:disable-next-line:quotemark
        text = this.getTextAfter(text.replaceAll('‘', "'").replaceAll('’', "'"), ele[0].context.replaceAll('‘', "'").replaceAll('’', "'"));
        this.arrayChar.push({
          text: ele[0].context,
          dataError: this.data.find((ele2: any) => ele2[0].context === ele[0].context)
        });
      });
      if (text) {
        this.arrayChar.push({
          text: text,
          dataError: null
        });
      }
    } else {
      this.arrayChar = [{
        text: this.context,
        dataError: null
      }];
    }
    console.log(this.arrayChar);

    this.countErrorAndWord();
  }

  convertResData(array: CheckGrammarFeedbackType[]) {
    const data: any = [];
    let prevData = '';
    let prevIndex = 0;
    if (array) {
      array.forEach((element: CheckGrammarFeedbackType, index: number) => {
        if (prevData !== element.context) {
          prevData = element.context;
          if (index !== 0) {
            data.push(array.slice(prevIndex, index));
            prevIndex = index;
          }
        }
      });
      data.push(array.slice(prevIndex, array.length));
    }
    return data;
  }

  countErrorAndWord() {
    if (this.context !== '') {
      let spellingErros = 0;
      let grammarError = 0;
      this.wordCount = this.context.replace(/\n/g, ' ').split(' ').filter(ele => ele !== '').length;
      this.dataGrammar?.data.check_grammar_feedback.forEach((ele: any) => {
        if (!ele.isDismiss) {
          if (ele.feedback_grammar === 'Possible spelling mistake found') {
            spellingErros += 1;
          } else {
            grammarError += 1;
          }
        }
      });
      this.grammarError = grammarError;
      this.spellingErros = spellingErros;
    }
  }

  getTextAfter(text: string, context: string) {
    let textCut = text.split(context);
    if (textCut.length > 2) {
      const rex = new RegExp(context, 'g');
      const mathText = Array.from(text.matchAll(rex));
      textCut = [textCut[0], text.slice(mathText[0].index + context.length)];
    }
    if (textCut.length < 2) {
      textCut = text.split(context);
    }
    if (textCut) {
      if (typeof textCut[1] === 'string') {
        this.arrayChar.push({
          text: textCut[0],
          dataError: null
        });
        return ['.', ','].includes(context) ? textCut[1] : (' ' + textCut[1]);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  checkGrammar() {
    if (this.ele.nativeElement.innerText !== '') {
      this.loading = true;
      this.writingAiService.checkGrammar(this.ele.nativeElement.innerText).subscribe((res: any) => {
        this.loading = false;
        if (res?.data?.check_grammar_feedback?.length > 0) {
          this.context = this.ele.nativeElement.innerText;
          this.dataGrammar = res;
          const arrNode = [];
          this.ele.nativeElement.childNodes.forEach((ele: any) => {
            if (![...ele.classList].includes('writing-results-content-text')) {
              arrNode.push(ele);
            } else {
              ele.childNodes.forEach((ele2: any) => {
                if (ele2.nodeName !== '#comment') {
                  arrNode.push(ele2);
                }
              });
            }
          });
          arrNode.forEach((ele: any) => { ele.remove(); });
          this.changeContentAnswer();
          this.countErrorAndWord();
        }
      });
    }
  }

  whenPaste(event) {
    event.preventDefault();
    const text = (event.clipboardData).getData('text/plain');
    event.clipboardData.clearData();
    event.clipboardData.setData('text/plain', text);
    const selection = document.getSelection();
    if (!selection?.rangeCount) {
      return;
    }
    selection.deleteFromDocument();
    const div = document.createElement('div');
    div.innerHTML = text;
    selection.getRangeAt(0).insertNode(div);
    selection.collapseToEnd();
  }

  whenCopy(event) {
    const selection = document.getSelection();
    event.clipboardData.setData('text/plain', selection?.toString());
    event.preventDefault();
  }

  autoSaveAnswer() {
    this.context = this.ele.nativeElement.innerText;
    this.saveAnswer.emit(this.context);
  }

}
