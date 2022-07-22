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
  private maxPerPage = 4;

  public numberOfPages = 1;
  public currentPage: BehaviorSubject<number> = new BehaviorSubject(1);

  public members: BehaviorSubject<IMemberDto[]> = new BehaviorSubject<IMemberDto[]>([]);
  public visibleMembers: BehaviorSubject<IMemberDto[]> = new BehaviorSubject<IMemberDto[]>([]);

  constructor(
    @Inject(IMemberApiServiceProvider)
    private apiService: IMemberApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();

    this.members.subscribe(members => {
      this.numberOfPages = Math.ceil(members.length / this.maxPerPage) || 1;
      this.currentPage.next(this.currentPage.value > this.maxPerPage ? this.maxPerPage : this.currentPage.value);
    });

    this.currentPage.subscribe(page => {
      const startIndex = page === 1 ? 0 : (page - 1) * this.maxPerPage;
      this.visibleMembers.next(this.members.value.slice(startIndex, startIndex + this.maxPerPage))
    });
  }

  deleteUser(id: number): void {
    this.apiService.delete(id);
    this.getUsers();
  }

  getUsers() {
    this.apiService.getCollection().subscribe(members => this.members.next(members));
  }

  next() {
    if (this.currentPage.value < this.numberOfPages) {
      this.currentPage.next(this.currentPage.value + 1);
    }
  }

  prev() {
    if (this.currentPage.value > 1) {
      this.currentPage.next(this.currentPage.value - 1);
    }
  }
}
