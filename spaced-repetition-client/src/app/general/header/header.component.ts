import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;

  isThemeDark: boolean = false;

  constructor(private authenticationService: AuthenticationService, private route: Router) { 
    route.events.subscribe(val => {
      this.isAuthenticated = this.authenticationService.isAuthenticated()
    })

    this.checkLocalStorage()
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authenticationService.logout();
    this.route.navigate(['/login'])
  }

  checkLocalStorage() {
    let darkModeActive = localStorage.getItem('dark-mode')
    console.log(darkModeActive);
    
  }

  setDarkTheme() {
    if (!this.isThemeDark) {
      document.querySelector('body')?.classList.remove('light-theme')
      document.querySelector('body')?.classList.add('dark-theme')
      this.isThemeDark = true
    } else {
      document.querySelector('body')?.classList.add('light-theme')
      document.querySelector('body')?.classList.remove('dark-theme')
      this.isThemeDark = false
    }
  }

}
