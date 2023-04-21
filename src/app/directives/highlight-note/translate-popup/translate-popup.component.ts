import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslatePopupService } from './translate-popup.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-translate-popup',
  templateUrl: './translate-popup.component.html',
  styleUrls: ['./translate-popup.component.scss']
})
export class TranslatePopupComponent implements OnInit, OnDestroy {
  id: string;
  text: string | any;
  disableBtnSpeak = false;
  speaking: SpeechSynthesisUtterance;
  positionFixed = {
    x: 0,
    y: 0,
  };
  subject: Subscription;

  constructor(private translateService: TranslatePopupService) { }

  ngOnDestroy(): void {
    window.speechSynthesis.cancel();
    this.subject.unsubscribe();
  }

  ngOnInit(): void {
    window.speechSynthesis.cancel();
    this.subject = this.translateService.translate(this.text).subscribe((res: any) => {
      console.log(res[0][0][0]);
    })
  }

  close() { }

  speak() {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(this.text);
    msg.addEventListener('end', () => {
      this.disableBtnSpeak = false;
    })
    speechSynthesis.speak(msg);
  }
}
