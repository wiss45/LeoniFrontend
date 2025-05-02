import { Component } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  statss = [
    { label: 'Projets', value: 120, color: 'bg-blue-500' },
    { label: 'Instruments', value: 75, color: 'bg-green-500' },
    { label: 'Plans', value: 30, color: 'bg-yellow-500' }
  ];

  constructor() { }

  currentDate = new Date();

  stats = [
    {
      label: 'Projets Actifs',
      value: 24,
      iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-600',
      trend: 'up',
      change: 12
    },
    {
      label: 'Équipements',
      value: 143,
      iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-500',
      textColor: 'text-green-600',
      trend: 'up',
      change: 8
    },
    // ... autres statistiques
  ];

  recentActivities = [
    {
      title: 'Nouveau projet créé',
      time: 'Il y a 2 heures',
      user: 'Mohamed Ali',
      bgColor: 'bg-blue-500',
      iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
    },
    // ... autres activités
  ];

  recentProjects = [
    {
      name: 'Projet Alpha',
      code: 'LE-2023-001',
      initials: 'PA',
      manager: 'Samia Ben Ahmed',
      department: 'Production',
      status: 'En cours',
      progress: 65,
      deliveryDate: new Date('2023-12-15')
    },
    // ... autres projets
  ];
 
}
