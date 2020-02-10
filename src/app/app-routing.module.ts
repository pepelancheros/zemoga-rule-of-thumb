import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { WorksComponent } from './features/works/works.component'
import { TrialsComponent } from './features/trials/trials.component';
import { LoginComponent } from './features/login/login.component';
import { PrivacyComponent } from './features/privacy/privacy.component';
import { ContactComponent } from './features/contact/contact.component';
import { TermsComponent } from './features/terms/terms.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'past-trials',
        component: TrialsComponent
      },
      {
        path: 'how-it-works',
        component: WorksComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'terms-and-conditions',
        component: TermsComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyComponent
      },
      {
        path: 'contact-us',
        component: ContactComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
