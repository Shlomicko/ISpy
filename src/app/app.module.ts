import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MissionsViewComponent } from './missions-view/missions-view.component';
import { MissionsManagerComponent } from './missions-manager/missions-manager.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'missions',
    component: MissionsViewComponent
  },
  {
    path: 'manage',
    component: MissionsManagerComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MissionsViewComponent,
    MissionsManagerComponent,
  ],
  imports: [
    BrowserModule, RouterModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
