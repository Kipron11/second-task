import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  currentTime: Date = new Date();

  ngOnInit(): void {
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  getCurrentTime() {
    this.currentTime = new Date();
  }
}
