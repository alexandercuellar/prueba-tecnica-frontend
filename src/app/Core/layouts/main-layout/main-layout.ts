import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { Toast } from '../../../shared/components/toast/toast';
@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    SidebarComponent
    ,Toast
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayoutComponent {

}
