import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PokeserveService {
  public API = environment.config.API_URL;

  constructor(private http: HttpClient) {
  }

  getallpokemon() {
    return this.http.get(`${this.API}/v2/pokemon`)
  }

  getallnextprevpokemon(path) {
    console.log("path:",path);
    return this.http.get(path)
  }
}
