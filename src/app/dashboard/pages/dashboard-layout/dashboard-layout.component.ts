import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  public sidebarItems = [
    { label: 'Panel de control', icon: 'label', url: '/panel-control' },
    { label: 'Dashboard', icon: 'add', url: '/dashboard' },
    { label: 'Studio', icon: 'search', url: '/studio' },
  ];

  messagesCount: number = 0;
  chatCount: number = 0;
  notificationsCount: number = 0;

  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.checkAuthStatus().subscribe((result) => {
      // Lógica para obtener los valores de messagesCount, chatCount y notificationsCount
    });
  }

  logout() {
    this.authService.logout();
  }
}
