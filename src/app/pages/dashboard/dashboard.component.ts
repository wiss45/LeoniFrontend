import { Component } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { label: 'Projets', value: 120, color: 'bg-blue-500' },
    { label: 'Instruments', value: 75, color: 'bg-green-500' },
    { label: 'Plans', value: 30, color: 'bg-yellow-500' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
 
}
