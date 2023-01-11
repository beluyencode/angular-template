import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';
  vocabulary = '<p>The bar chart gives data on...</p>\r\n\r\n<p>The largest market by far....</p>\r\n\r\n<p><em>Mexico (n):</em></p>\r\n\r\n<p><em>the US (n):</em></p>\r\n\r\n<p><em>Canada (n):</em></p>\r\n\r\n<p>Notable features are that all countries in the bar chart had higher figures for last year than <strong>six years ago</strong>, and that most countries importing US <strong>processed foods</strong>, the exceptions being Canada, Mexico and the Rest of the World, were all across the Pacific from the US. All these countries are Asian, except for Australia. Asian markets together are therefore vital for the US processed food industry.</p>\r\n'
}
