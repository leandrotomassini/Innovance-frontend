import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProminentCoursesComponent } from './components/prominent-courses/prominent-courses.component';
import { LastCoursesComponent } from './components/last-courses/last-courses.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomePageComponent,
    NavBarComponent,
    ProminentCoursesComponent,
    LastCoursesComponent,
    SubscriptionsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
