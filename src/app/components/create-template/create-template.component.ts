import { Component } from '@angular/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent {

  rotate(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log((event.target as HTMLDivElement).parentElement);
    let boxBoundingRect = (event.target as HTMLDivElement).parentElement!.getBoundingClientRect();
    let boxCenter = {
      x: boxBoundingRect.left + boxBoundingRect.width / 2,
      y: boxBoundingRect.top + boxBoundingRect.height / 2
    };
    document.onmousemove = (e) => {
      let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y)) * (180 / Math.PI);
      const rotate = (event.target as HTMLDivElement).parentElement!.style.transform.split('rotate')[0] + ` rotate(${angle}deg)`;
      (event.target as HTMLDivElement).parentElement!.style.transform = rotate;
    }
    document.onmouseup = () => {
      document.onmousemove = null;
    }
  }
}