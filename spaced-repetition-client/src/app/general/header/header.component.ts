import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;

  isThemeDark: boolean = false;

  selectLang:string="fr";
  TransLang: string[] = [];

  constructor(private authenticationService: AuthenticationService, private route: Router, private translate: TranslateService) { 
    route.events.subscribe(val => {
      this.isAuthenticated = this.authenticationService.isAuthenticated()
    })

    translate.setDefaultLang('fr');
    translate.addLangs(['en', 'fr']);
    translate.use('fr');
  }

  ngOnInit(): void {
    this.getTransLanguage();
  }

  // i18n
  setTransLanguage(){
    this.translate.use(this.selectLang);
  }

  getTransLanguage(){
    this.TransLang=[...this.translate.getLangs()];
  }

  onLogout() {
    this.authenticationService.logout();
    this.route.navigate(['/login'])
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
