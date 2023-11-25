import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  lines: string[] = [
    'Join us' ,
    'on your journey',
    'to better health.',
    'We are here to',
    ' connect your Dots'
  ];
}
