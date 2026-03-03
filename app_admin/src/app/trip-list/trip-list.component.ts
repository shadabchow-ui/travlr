import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  apiError: string | null = null;
  newTrip: Trip = this.blankTrip();
  addError: string | null = null;
  selected: Trip | null = null;
  editModel: Trip | null = null;
  editError: string | null = null;

  constructor(private tripService: TripDataService, public authService: AuthService) {}

  ngOnInit(): void { this.loadTrips(); }

  private blankTrip(): Trip { return { tripCode:'', name:'', description:'', length:'', price:'', image:'' }; }

  loadTrips(): void {
    this.loading = true; this.apiError = null;
    this.tripService.getTrips().subscribe({
      next: (trips) => { this.trips = [...(trips || [])].sort((a,b)=>a.tripCode.localeCompare(b.tripCode)); this.loading = false; },
      error: (err) => { this.loading = false; this.apiError = err?.message || 'Could not load trips.'; }
    });
  }

  startEdit(trip: Trip): void {
    if (!this.authService.hasToken()) return;
    this.selected = trip;
    this.editModel = { ...trip, description: trip.description || '', length: trip.length || '', price: trip.price || '', image: trip.image || '' };
    this.editError = null;
    setTimeout(() => document.getElementById('editForm')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  cancelEdit(): void { this.selected = null; this.editModel = null; this.editError = null; }

  saveEdit(): void {
    if (!this.selected || !this.editModel) return;
    this.editError = null;
    if (!this.editModel.name?.trim()) { this.editError = 'Name is required.'; return; }
    this.tripService.updateTrip(this.selected.tripCode, {
      name: this.editModel.name, description: this.editModel.description, length: this.editModel.length, price: this.editModel.price, image: this.editModel.image
    }).subscribe({
      next: () => { this.cancelEdit(); this.loadTrips(); },
      error: (err) => { this.editError = err?.error?.message || err?.message || 'Update failed.'; }
    });
  }

  addTrip(): void {
    if (!this.authService.hasToken()) { this.addError = 'Please log in first.'; return; }
    this.addError = null;
    if (!this.newTrip.tripCode?.trim()) { this.addError = 'Trip code is required.'; return; }
    if (!this.newTrip.name?.trim()) { this.addError = 'Name is required.'; return; }
    const payload: Trip = {
      tripCode: this.newTrip.tripCode.trim(), name: this.newTrip.name.trim(), description: this.newTrip.description || '', length: this.newTrip.length || '', price: this.newTrip.price || '', image: this.newTrip.image || ''
    };
    this.tripService.addTrip(payload).subscribe({
      next: () => { this.newTrip = this.blankTrip(); this.loadTrips(); },
      error: (err) => { this.addError = err?.error?.message || err?.message || 'Add failed.'; }
    });
  }

  resetNewTrip(): void { this.newTrip = this.blankTrip(); this.addError = null; }

  deleteTrip(trip: Trip): void {
    if (!this.authService.hasToken()) return;
    const ok = confirm(`Delete trip ${trip.tripCode} (${trip.name})?`);
    if (!ok) return;
    this.tripService.deleteTrip(trip.tripCode).subscribe({
      next: () => { if (this.selected?.tripCode === trip.tripCode) this.cancelEdit(); this.loadTrips(); },
      error: (err) => { alert(err?.error?.message || err?.message || 'Delete failed.'); }
    });
  }
}
