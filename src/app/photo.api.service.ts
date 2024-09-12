import { Injectable } from '@angular/core';
import { Categorie } from './defi/categorie.enum';
import { HttpClient } from '@angular/common/http';
import { AuthApiService } from './auth.api.service';
import { environment } from '../environments/environment';
import { PhotoResponse } from './defi/photo.response.dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoApiService {
  url = environment.apiUrl + '/photo';

  constructor(private http: HttpClient, private auth: AuthApiService) {}

  ajouterPhoto(categorie: string, photo: File): Observable<string> {
    console.log(categorie);
    const formData: FormData = new FormData();
    formData.append('file', photo, photo.name);
    return this.http.put(this.url + '/' + categorie, formData, {
      headers: this.auth.tokenHeader(),
      responseType: 'text',
    });
  }

  getPhoto(categorie: string) {
    return this.http.get<PhotoResponse>(this.url + '/' + categorie, {
      headers: this.auth.tokenHeader(),
    });
  }

  getPhotos() {
    return this.http.get<PhotoResponse[]>(this.url, {
      headers: this.auth.tokenHeader(),
    });
  }

  supprimerPhoto(categorie: string) {
    return this.http.delete(this.url + '/' + categorie, {
      headers: this.auth.tokenHeader(),
    });
  }
}
