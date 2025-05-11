import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../../../services/plan.service';
import { Plan } from '../../../interfaces/plan';

@Component({
  selector: 'app-notificationsequipements',
  standalone: false,
  templateUrl: './notificationsequipements.component.html',
  styleUrl: './notificationsequipements.component.css'
})
export class NotificationsequipementsComponent {
plans : Plan[] =[]
  plansToNotify: Plan[] = [];

  constructor( private planService: PlanService , private router : Router){}

   ngOnInit(): void{
       this.planService.getPlans().subscribe((data: Plan[]) => {
        this.plans = data;
        console.log(data)
        this.filterPlansToNotify();
      });
     
    }
  
  
  
  viewPlanDetails(planId: number) {
    // Navigation vers la page de détails
    this.router.navigate(['/plans', planId]);
  }
  

    
    filterPlansToNotify(): void {
      const today = new Date();
  
      this.plansToNotify = this.plans.filter(plan => {
        if (!plan.deliveryDate) return false;
      
        const deliveryDate = new Date(plan.deliveryDate);
        const diffInDays = Math.ceil((deliveryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
        return diffInDays === 1; 
      });
    }
}
