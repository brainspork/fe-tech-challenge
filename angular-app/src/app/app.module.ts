import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberPageComponent } from './components/member-page/member-page.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { FormsModule } from '@angular/forms';
import { SsnMaskDirective } from './directives/ssn-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberPageComponent,
    MemberCreateComponent,
    SsnMaskDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
