import { Component, computed, effect, inject } from '@angular/core';

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
    { label: 'Instructores', icon: 'person_book', url: '/panel-control/instructores' },
    { label: 'Subscripciones', icon: 'price_change', url: '/panel-control/subscripciones' },
    { label: 'Dashboard', icon: 'apps', url: '/clases' },
  ];

  private authService = inject(AuthService);


  logout(){
    this.authService.logout();
  }

}
