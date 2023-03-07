import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CheckGrammarFeedbackType } from '../../writing-ai';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-writing-ai-char',
  templateUrl: './writing-ai-char.component.html',
  styleUrls: ['./writing-ai-char.component.scss']
})
export class WritingAiCharComponent implements OnInit {
  @Input() char: any;
  @ViewChild('charErrorDiv') charErrorDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('charErrorMenu') charErrorMenu!: ElementRef<HTMLDivElement>;
  @ViewChild('charError') charError: ElementRef<HTMLSpanElement>;
  @Input() arrayDataError: CheckGrammarFeedbackType[];
  dataError: CheckGrammarFeedbackType | any;
  typeError: any = 'GRAMMAR';
  isOpenPopup = false;
  isTouchMargin = false;

  constructor(
    private renderer: Renderer2,
  ) { }


  ngOnInit(): void {
    this.dataError = this.arrayDataError.find(ele => ele.error_grammar === this.char.text);
    if (this.dataError) {
      this.char.text = this.char.text;
      if (this.dataError?.feedback_grammar === 'Possible spelling mistake found') {
        this.typeError = 'SPELLING';
      }
    }
    if (this.char.isError) {
      this.renderer.listen('window', 'click', (e: any) => {
        if (!this.charErrorDiv?.nativeElement.contains(e.target)) {
          // clicked outside => close dropdown list
          this.isOpenPopup = false;
        } else {
          this.isOpenPopup = true;
          if (this.charErrorDiv.nativeElement.getBoundingClientRect().left + this.charErrorMenu.nativeElement.offsetWidth > window.innerWidth) {
            this.isTouchMargin = true;
          } else {
            this.isTouchMargin = false;
          }
        }
      });
    }
  }

  changeChar(errorData: any, index: number, isDismiss?: boolean) {
    const newEle = document.createElement('span');
    const changeText = isDismiss ? errorData?.error_grammar : errorData?.feedback_grammar_suggestion[index];
    newEle.textContent = changeText;
    this.charErrorDiv.nativeElement.replaceChild(newEle, this.charError.nativeElement);
    this.charErrorMenu.nativeElement.remove();
    // if (isDismiss) {
    //   this.writingAiCommonService.dataGrammar.data.check_grammar_feedback = this.writingAiCommonService.dataGrammar.data.check_grammar_feedback.map(ele => {
    //     if (JSON.stringify(errorData) === JSON.stringify(ele)) {
    //       return {
    //         ...ele,
    //         isDismiss: true
    //       };
    //     }
    //     return ele;
    //   });
    // } else {
    //   this.writingAiCommonService.dataGrammar.data.check_grammar_feedback = this.writingAiCommonService.dataGrammar.data.check_grammar_feedback.map(ele => {
    //     if (errorData.context === ele.context) {
    //       if (errorData.error_grammar !== ele.error_grammar) {
    //         return {
    //           ...ele,
    //           context: this.getContextChange(errorData.context, errorData.error_grammar, changeText)
    //         };
    //       }
    //     } else {
    //       return ele;
    //     }
    //   }).filter(ele => ele);
    // }
    // this.writingAiCommonService.onChangeVar.next(true);
  }

  getContextChange(text: string, error_grammar: any, changeText: string) {
    // tslint:disable-next-line:quotemark
    const error_grammar_change = error_grammar.replaceAll('‘', "'").replaceAll('’', "'");
    const rex = new RegExp(error_grammar, 'g');
    const isDotOrComma = ['.', ','].includes(error_grammar.trim());
    let textCut = text.split(isDotOrComma ? error_grammar_change : ' ' + error_grammar_change);
    if (textCut.length > 2) {
      const mathText = Array.from(text.matchAll(rex));
      textCut = [textCut[0], text.slice(mathText[0].index + error_grammar_change.length)];
    }
    if (textCut.length < 2) {
      // tslint:disable-next-line:quotemark
      textCut = text.split(error_grammar_change.replaceAll('‘', "'").replaceAll('’', "'"));
    }
    return (textCut[0] + (isDotOrComma ? changeText : ' ' + changeText) + textCut[1]);
  }
}
