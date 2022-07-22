import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberPageComponent } from './components/member-page/member-page.component';

const routes: Routes = [
  { path: 'member/new', component: MemberCreateComponent },
  { path: 'member/:id', component: MemberPageComponent },
  { path: '**', component: MemberListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
