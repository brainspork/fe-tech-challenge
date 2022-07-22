import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IMemberDto } from "src/app/models/dto/member-dto.model";
import { repository } from "../api-repository";
import { IMemberApiService } from "./member-api.service";

@Injectable({
    providedIn: 'root'
})

export class StubMemberApiService implements IMemberApiService {
    /**
     * Get all of our credit union members
     * @returns A collection of members
     */
    getCollection(): Observable<IMemberDto[]> {
        let ret = repository.map(x => x.member);
        
        return of(ret);
    }
    
    /**
     * Gets a member with the provided id from the "API"
     * @param id - The id of the member to get
     * @returns A member
     */
    get(id: number): Observable<IMemberDto | undefined> {
        let ret = repository.map(x => x.member)
            .find(x => x.id === id)
        
        if (!ret) throw new Error("Member does not exist.");
        
        return of(ret);
    }

    /**
     * Onboards a new member.  Hooray!!
     * @param member - The new member to enroll in our credit union
     * @returns The newly created member
     */
    create(member: IMemberDto): Observable<IMemberDto> {
        const nextId = repository.map(x => x.member).sort((a, b) => b.id! - a.id!)[0].id!++;
        console.log(nextId);
        repository.push({
            member: { ...member, id: nextId },
            preapprovals: []
        })
        
        return of(member);
    }
    
    /**
     * Updates an existing member's information
     * @param member - The updated member
     * @returns The updated member
     */
    update(member: IMemberDto): Observable<IMemberDto> {
        let toUpdate = repository.find(x => x.member.id == member.id);
        if (!toUpdate) throw new Error("Member does not exist.");
        
        Object.assign(toUpdate, member);
        
        return of(member);
    }
    
    /**
     * Removes a member from our credit union. 😢
     * @param id - The id of the member to remove
     */
    delete(id: number): Observable<void> {
        let memberIds = repository.map(x => x.member.id);
        let indexToDelete = memberIds.indexOf(id);
        if (id === -1) throw new Error("Member does not exist.");

        repository.splice(indexToDelete, 1);

        return of();
    }
}