import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserResponseDto, UpdateUserDto } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  // Mettre à jour un utilisateur
  updateUser(id: string, updateData: UpdateUserDto): Observable<UserResponseDto> {
    return this.apiService.put<UserResponseDto>(`/users/${id}`, updateData);
  }

  // Supprimer un utilisateur
  deleteUser(id: string): Observable<void> {
    return this.apiService.delete<void>(`/users/${id}`);
  }
}
