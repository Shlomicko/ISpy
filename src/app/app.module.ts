import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MissionsViewComponent } from './missions-view/missions-view.component';
import {RouterModule, Routes} from '@angular/router';
import { IsolatedMissionsComponent } from './isolated-missions/isolated-missions.component';

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
    path: 'isolated',
    component: IsolatedMissionsComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MissionsViewComponent,
    IsolatedMissionsComponent,
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
