import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IMemberDto } from 'src/app/models/dto/member-dto.model';
import { IMemberApiServiceProvider } from 'src/app/services/api/member/member-api.config';
import { IMemberApiService } from 'src/app/services/api/member/member-api.service';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {
  public member: BehaviorSubject<IMemberDto | undefined> = new BehaviorSubject<IMemberDto | undefined>(undefined);
  public ssnIsRevealed: boolean = false;

  public newSsn: string | undefined;
  public newDateOfBirth: Date | undefined;
  public errorMessage: string = ''

  public isEditing: boolean = false;

  constructor(
    @Inject(IMemberApiServiceProvider)
    private apiService: IMemberApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.apiService.get(parseInt(params['id'])).subscribe(member => this.member.next(member));
    });
  }

  toggleSsnVisibility(): void {
    this.ssnIsRevealed = !this.ssnIsRevealed;
  }
  
  beginEditing(): void {
    this.isEditing = true;
    this.newDateOfBirth = this.member.value?.dateOfBirth;
    this.newSsn = this.member.value?.ssn;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.newDateOfBirth = undefined;
    this.newSsn = undefined;
    this.errorMessage = '';
  }

  updateUser(): void {
    if (this.newDateOfBirth && this.newSsn) {
      this.apiService
        .update({ ...this.member.value!, dateOfBirth: this.newDateOfBirth, ssn: this.newSsn })
        .subscribe(member => {
          this.member.next(member);
          this.cancelEditing();
        });
    } else {
      this.errorMessage = 'All fields must have a value';
    }
  }
}
