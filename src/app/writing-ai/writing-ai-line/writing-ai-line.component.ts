import { Component, Input, OnInit } from '@angular/core';
import { CheckGrammarFeedbackType } from '../writing-ai';

@Component({
  selector: 'app-writing-ai-line',
  templateUrl: './writing-ai-line.component.html',
  styleUrls: ['./writing-ai-line.component.scss']
})
export class WritingAiLineComponent implements OnInit {
  @Input() data: CheckGrammarFeedbackType[];
  arrayChar: any = [];

  ngOnInit(): void {
    let text: any = this.data[0].context;
    this.data.forEach(ele => {
      text = this.getTextAfter(text, ele.error_grammar);
      this.arrayChar.push({
        text: ele.error_grammar,
        isError: true,
        isDismiss: ele.isDismiss
      });
    });
    if (text) {
      this.arrayChar.push({
        text: text,
        isError: false
      });
    }
    console.log(this.arrayChar);
  }

  getTextAfter(text: string, error_grammar: any) {
    // tslint:disable-next-line:quotemark
    const error_grammar_change = error_grammar.replaceAll('‘', "'").replaceAll('’', "'");
    const rex = new RegExp(error_grammar_change, 'g');
    const isDotOrComma = ['.', ','].includes(error_grammar_change.trim());
    let textCut = text.split(isDotOrComma ? error_grammar_change : ' ' + error_grammar_change);
    if (textCut.length > 2) {
      const mathText = Array.from(text.matchAll(rex));
      textCut = [textCut[0], text.slice(mathText[0].index + error_grammar_change.length)];
    }
    if (textCut.length < 2) {
      textCut = text.split(error_grammar_change);
    }
    if (textCut) {
      if (isDotOrComma) {
        this.arrayChar.push({
          text: textCut[0],
          isError: false
        });
      } else {
        this.arrayChar.push({
          text: textCut[0] + ' ',
          isError: false
        });
      }
      return textCut[1];
    } else {
      return null;
    }
  }

}
