import { Component, OnInit, OnDestroy } from '@angular/core';

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

  constructor() { }

  ngOnDestroy(): void {
    console.log(123);

    window.speechSynthesis.cancel();
  }

  ngOnInit(): void {
    window.speechSynthesis.cancel();

    console.log(this.positionFixed);
  }

  close() { }

  speak() {
    this.disableBtnSpeak = true;
    const msg = new SpeechSynthesisUtterance(this.text);
    msg.addEventListener('end', () => {
      this.disableBtnSpeak = false;
    })
    speechSynthesis.speak(msg);
  }
}
