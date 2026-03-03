import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Input() canEdit = false;

  @Output() edit = new EventEmitter<Trip>();
  @Output() del = new EventEmitter<Trip>();

  onEdit() { if (this.canEdit) this.edit.emit(this.trip); }
  onDelete() { if (this.canEdit) this.del.emit(this.trip); }
}
