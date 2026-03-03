import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * GET /api/trips
   */
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  /**
   * GET /api/trips/:tripCode
   */
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${encodeURIComponent(tripCode)}`);
  }

  /**
   * POST /api/trips
   */
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.baseUrl}/trips`, trip);
  }

  /**
   * PUT /api/trips/:tripCode
   */
  updateTrip(tripCode: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/trips/${encodeURIComponent(tripCode)}`, trip);
  }

  /**
   * DELETE /api/trips/:tripCode
   */
  deleteTrip(tripCode: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/trips/${encodeURIComponent(tripCode)}`);
  }
}
