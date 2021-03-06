import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NgPipesModule} from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { LeftMenuItemComponent } from './left-menu-item/left-menu-item.component';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
import { RawJsonPageComponent } from './raw-json-page/raw-json-page.component';
import { PreloaderOverlayComponent } from './preloader-overlay/preloader-overlay.component';
import { ModalOverlayComponent } from './modal-overlay/modal-overlay.component';
import { FormsModule } from '@angular/forms';
import { PicsPageComponent } from './pics-page/pics-page.component';
import { PicsItemComponent } from './pics-item/pics-item.component';
import { TestsPageComponent } from './tests-page/tests-page.component';
import { TestsSelectorComponent } from './tests-selector/tests-selector.component';
import { IonicModule } from '@ionic/angular';
import { TestsItemComponent } from './tests-item/tests-item.component';
import { TestsCategoryComponent } from './tests-category/tests-category.component';
import { TestsOptionsComponent } from './tests-options/tests-options.component';
import { TestsAnswerComponent } from './tests-answer/tests-answer.component';
import { TestsOptionsPlaceholderComponent } from './tests-options-placeholder/tests-options-placeholder.component';

const appRoutes: Routes = [
  { path: '', component: PlaceholderPageComponent},
  { path: 'main', component: MainPageComponent},
  { path: 'raw-json', component: RawJsonPageComponent},
  { path: 'pics', component: PicsPageComponent},
  { path: 'tests', component: TestsPageComponent}
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
    PicsItemComponent,
    TestsPageComponent,
    TestsSelectorComponent,
    TestsItemComponent,
    TestsCategoryComponent,
    TestsOptionsComponent,
    TestsAnswerComponent,
    TestsOptionsPlaceholderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    FormsModule,
    NgPipesModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
