import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NgPipesModule} from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LeftMenuItemComponent } from './left-menu-item/left-menu-item.component';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
import { RawJsonPageComponent } from './raw-json-page/raw-json-page.component';
import { PreloaderOverlayComponent } from './preloader-overlay/preloader-overlay.component';
import { ModalOverlayComponent } from './modal-overlay/modal-overlay.component';
import { FormsModule } from '@angular/forms';
import { PicsPageComponent } from './pics-page/pics-page.component';
import { PicsItemComponent } from './pics-item/pics-item.component';

const appRoutes: Routes = [
  { path: '', component: PlaceholderPageComponent},
  { path: 'main', component: MainPageComponent},
  { path: 'raw-json', component: RawJsonPageComponent},
  { path: 'pics', component: PicsPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LeftMenuComponent,
    LeftMenuItemComponent,
    PlaceholderPageComponent,
    RawJsonPageComponent,
    PreloaderOverlayComponent,
    ModalOverlayComponent,
    PicsPageComponent,
    PicsItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    NgPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
