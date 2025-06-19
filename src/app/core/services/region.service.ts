import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Region } from "../models/region.model";

@Injectable({
  providedIn: "root",
})
export class RegionService {
  private apiUrl = `${environment.apiUrl}/regions`;

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl);
  }

  getRegionById(id: string): Observable<Region> {
    return this.http.get<Region>(`${this.apiUrl}/${id}`);
  }

  createRegion(region: Partial<Region>): Observable<Region> {
    return this.http.post<Region>(this.apiUrl, region);
  }

  updateRegion(id: string, region: Partial<Region>): Observable<Region> {
    return this.http.put<Region>(`${this.apiUrl}/${id}`, region);
  }

  deleteRegion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
