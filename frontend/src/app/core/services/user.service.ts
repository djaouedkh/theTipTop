// core/services/user.service.ts

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
// DTOs importés depuis le back-end
import { UserGetDto } from '../../../../../backend/src/users/dtos/user-get.dto';
import { UserCreateDto } from '../../../../../backend/src/users/dtos/user-create.dto';
import { UpdateUserDto } from '../../../../../backend/src/users/dtos/user-update.dto';
import { UserSearchCriteria } from '../../../../../backend/src/users/dtos/user-get.dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private apiService: ApiService) {}

    // Récupérer tous les utilisateurs
    getAllUsers(): Observable<UserGetDto[]> {
        return this.apiService.get<UserGetDto[]>('users');
    }

    // Récupérer un utilisateur par son ID
    getUserById(id: number): Observable<UserGetDto> {
        return this.apiService.get<UserGetDto>(`users/${id}`);
    }

    // Récupérer les utilisateurs par critères de recherche
    searchUsers(criteria: UserSearchCriteria): Observable<UserGetDto[]> {
        return this.apiService.get<UserGetDto[]>(`users/search`, criteria);
    }

    // Créer un nouvel utilisateur
    createUser(data: UserCreateDto): Observable<UserGetDto> {
        return this.apiService.post<UserGetDto>('users/create', data);
    }

    // Mettre à jour un utilisateur existant
    updateUser(id: number, data: UpdateUserDto): Observable<UserGetDto> {
        return this.apiService.put<UserGetDto>(`users/${id}`, data);
    }

    // Supprimer un utilisateur
    deleteUser(id: number): Observable<UserGetDto> {
        return this.apiService.delete<UserGetDto>(`users/${id}`);
    }
}
