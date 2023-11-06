import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  currentTime: Date = new Date();
  routes = ROUTES;

  ngOnInit(): void {
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  getCurrentTime() {
    this.currentTime = new Date();
  }
}
