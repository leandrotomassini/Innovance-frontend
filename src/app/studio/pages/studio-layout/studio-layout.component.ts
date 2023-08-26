import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-studio-layout',
  templateUrl: './studio-layout.component.html',
  styleUrls: ['./studio-layout.component.css']
})
export class StudioLayoutComponent {
  public sidebarItems = [
    { label: 'Cursos', icon: 'subscriptions', url: '/studio/cursos' },
    // { label: 'Escuelas', icon: 'school', url: '/studio/escuelas' },
    // { label: 'Rutas', icon: 'route', url: '/studio/rutas' },
    { label: 'Dashboard', icon: 'apps', url: '/clases' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
  }

  goDashboard() {
    this.router.navigate(['/clases']);
  }
}
