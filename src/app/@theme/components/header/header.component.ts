import { Utils } from './../../../pages/miscellaneous/Utils/utils';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { NB_WINDOW, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import * as $ from 'jquery';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },

  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Editar Perfil' }, { title: 'Deslogar', data: {id: 'deslogar'} } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router,
              @Inject(NB_WINDOW) private window) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        const util = Utils.getSessionPessoa();
          if(util.nome !== users.pessoa.name){
           const att = {name:util.nome , tittle:util.nome}
           this.user= att;
          }else{
           this.user = users.pessoa
          }
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

      this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(($event) => {
        if ($event === 'Deslogar') {
          sessionStorage.clear();
          this.router.navigate(['/']);
        }
        if($event === 'Editar Perfil'){
          this.router.navigate(['/pages/editarPerfil']);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  changeFont(operator) {
    let size = $(".ng-star-inserted").css('font-size');
    let sizeH1 = $("h1").css('font-size');
    let sizeH4 = $("h4").css('font-size');

    size = size.replace('px', '');
    sizeH1 = sizeH1 ? sizeH1.replace('px', '') : "";
    sizeH4 = sizeH4 ? sizeH4.replace('px', '') : "";
    let newSize = 0;
    let newSizeH1 = 0;
    let newSizeH4 = 0;
    if(operator === '+'){
      newSize = parseInt(size) + 1.4;
      newSizeH1 = parseInt(sizeH1) + 1.4;
      newSizeH4 = parseInt(sizeH4) + 1.4;
    } else {
      newSize = parseInt(size) - 1.4;
      newSizeH1 = parseInt(sizeH1) - 1.4;
      newSizeH4 = parseInt(sizeH4) - 1.4;
    }

    $(".ng-star-inserted").animate({'font-size' : newSize + 'px'});
    $("h1").animate({'font-size' : newSizeH1 + 'px'});
    $("h4").animate({'font-size' : newSizeH4 + 'px'});
  }
}
