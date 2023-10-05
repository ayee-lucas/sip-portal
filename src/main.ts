/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AdminModule } from './app/admin/admin.module';

platformBrowserDynamic()
  .bootstrapModule(AdminModule)
  .catch(err => console.error(err));
