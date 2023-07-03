import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  public sidebarItems = [
    { label: 'Panel de control', icon: 'label', url: '/control-panel' },
    { label: 'Dashboard', icon: 'add', url: '/dashboard' },
    { label: 'Studio', icon: 'search', url: '/studio' },
  ];


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkAuthStatus().subscribe((result) => {
      // console.log('seteando completado:', result);
      // console.log(this.authService.currentUser);
    });
  }


}
