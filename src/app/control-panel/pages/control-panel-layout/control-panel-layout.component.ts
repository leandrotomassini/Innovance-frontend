import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStatus } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-control-panel-layout',
  templateUrl: './control-panel-layout.component.html',
  styleUrls: ['./control-panel-layout.component.css']
})
export class ControlPanelLayoutComponent {

  public sidebarItems = [
    { label: 'Panel de control', icon: 'data_thresholding', url: '/panel-control' },
    { label: 'Usuarios', icon: 'groups', url: '/panel-control/usuarios' },
    { label: 'Subscripciones', icon: 'price_change', url: '/panel-control/subscripciones' },
  ];

  private authService = inject(AuthService);


  logout(){
    this.authService.logout();
  }

}
