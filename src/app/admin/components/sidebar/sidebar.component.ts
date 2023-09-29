import { Component } from '@angular/core';
import { AuthStatusService } from '../../../security/services/auth-status.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private authStatusService: AuthStatusService) {}
}
