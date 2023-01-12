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
        isError: true
      })
    })
    if (text) {
      this.arrayChar.push({
        text: text,
        isError: false
      });
    }
    console.log(this.data, this.arrayChar);

  }

  getTextAfter(text: string, error_grammar: string) {
    let textCut = text.split(!['.', ','].includes(error_grammar.trim()) ? (' ' + error_grammar + ' ') : error_grammar);
    if (textCut.length > 2) {
      textCut = [textCut[0], ...text.split(textCut[0] + (' ' + error_grammar + ' ')).filter(element => element !== '')]
    }
    if (textCut.length < 2) {
      textCut = text.split(error_grammar)
    }
    if (textCut) {
      this.arrayChar.push({
        text: textCut[0],
        isError: false
      });
      return ['.', ','].includes(error_grammar.trim()) ? textCut[1] : (' ' + textCut[1]);
    } else {
      return null
    }
  }

}
