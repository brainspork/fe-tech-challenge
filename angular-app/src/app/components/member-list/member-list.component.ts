import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMemberDto } from 'src/app/models/dto/member-dto.model';
import { IMemberApiServiceProvider } from 'src/app/services/api/member/member-api.config';
import { IMemberApiService } from 'src/app/services/api/member/member-api.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  public members: BehaviorSubject<IMemberDto[]> = new BehaviorSubject<IMemberDto[]>([]);

  constructor(
    @Inject(IMemberApiServiceProvider)
    private apiService: IMemberApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  deleteUser(id: number): void {
    this.apiService.delete(id);
    this.getUsers();
  }

  getUsers() {
    this.apiService.getCollection().subscribe(members => this.members.next(members));
  }
}
