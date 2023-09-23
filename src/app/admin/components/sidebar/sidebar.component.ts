import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  index!: number | null;

  constructor() {
    if (!localStorage.getItem('index')) {
      this.index = 0;
      localStorage.setItem('index', this.index.toString());

      return;
    }

    this.index = Number(localStorage.getItem('index'));
    console.log(this.index);
  }

  changeIndex(index: number) {
    localStorage.setItem('index', index.toString());
    this.index = index;
  }
}
