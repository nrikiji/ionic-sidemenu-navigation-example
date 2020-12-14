import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { trigger, transition, query, style, animate, group } from '@angular/animations';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

enum PageType {
  Root,
  Age,
  Area,
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('animSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})

export class AppComponent implements OnInit {
  page: PageType = PageType.Root;
  pageType = PageType;

  public menus = [
    'Age',
    'Area',
  ];

  public ages = [
    '0 - 9',
    '10 - 19',
    '20 - 29',
    '30 - 39',
    '40 - 49',
    '50 over',
  ];

  public areas = [
    'Hokaido',
    'Tohoku',
    'Kanto',
    'Chubu',
    'Kansai',
    'Chugoku',
    'Kyusyu',
    'Okinawa',
  ];

  public conditions = {
    ages: [],
    areas: [],
  }

  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.conditions = {
      ages: new Array<boolean>(this.ages.length),
      areas: new Array<boolean>(this.areas.length),
    };
  }

  next = (page: PageType) => this.page = page;
  back = () => this.page = PageType.Root;
  search = () => this.menuController.close();

  get strAges(): string {
    return this.ages.filter((_, i) => this.conditions['ages'][i]).join(' / ');
  }

  get strAreas(): string {
    return this.areas.filter((_, i) => this.conditions['areas'][i]).join(' / ');
  }
}
