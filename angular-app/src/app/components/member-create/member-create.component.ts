import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMemberDto } from 'src/app/models/dto/member-dto.model';
import { IMemberApiServiceProvider } from 'src/app/services/api/member/member-api.config';
import { IMemberApiService } from 'src/app/services/api/member/member-api.service';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  public firstName: string = '';
  public lastName: string = '';
  public dateOfBirth: Date | undefined = undefined;
  public ssn: string = '';

  public errorMessage: string = ''
  
  constructor(
    @Inject(IMemberApiServiceProvider)
    private apiService: IMemberApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createUser() {
    const member: IMemberDto = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth!,
      ssn: this.ssn
    };

    if (!this.firstName || !this.lastName || !this.dateOfBirth || !this.ssn) {
      this.errorMessage = 'All fields must have a value';
    } else {
      this.apiService.create(member).subscribe(() => this.router.navigate(['/']));
    }
  }
}
