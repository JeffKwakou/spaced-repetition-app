import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: boolean;
  public isThemeDark: boolean = false;

  public selectLang: string = localStorage.getItem('lang') || 'fr';
  public TransLang: string[] = [];

  @ViewChild('body') body: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    route.events.subscribe(() => {
      this.isAuthenticated = this.authenticationService.isAuthenticated();
    });

    translate.setDefaultLang('fr');
    translate.addLangs(['en', 'fr']);
    this.setTransLanguage();
  }

  ngOnInit(): void {
    this.getTransLanguage();

    // Set dark mode
    this.isThemeDark = localStorage.getItem('theme') == 'dark' ? false : true;
    this.setDarkTheme();
  }

  public setTransLanguage(): void {
    this.translate.use(this.selectLang);
    localStorage.setItem('lang', this.selectLang)
  }

  public onLogout(): void {
    this.authenticationService.logout();
    this.route.navigate(['/login']);
  }

  public setDarkTheme(): void {
    const body = this.document.body;

    if (!this.isThemeDark) {
      this.isThemeDark = true;
      localStorage.setItem('theme', 'dark');

      this.renderer.removeClass(body, 'light-theme');
      this.renderer.addClass(body, 'dark-theme');
    } else {
      this.isThemeDark = false;
      localStorage.setItem('theme', 'light');

      this.renderer.addClass(body, 'light-theme');
      this.renderer.removeClass(body, 'dark-theme');
    }
  }

  private getTransLanguage(): void{
    this.TransLang = [...this.translate.getLangs()];
  }

}
