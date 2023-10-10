import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-first-glance',
  templateUrl: './first-glance.component.html'
})
export class FirstGlanceComponent {
  constructor(private TranslateService: TranslateService) {
    this.TranslateService.setDefaultLang('es');
    this.TranslateService.use('es');
  }
}
