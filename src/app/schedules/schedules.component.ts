import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ISchedules, Schedule } from '../schedules.interface';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedules',
  imports: [CommonModule, RouterModule],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.scss',
})
export class SchedulesComponent implements OnInit {
  public data: ISchedules = { schedules: [], holidaysDays: [] };
  public scheduleDay: Schedule = {
    day: '',
    schedule: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly service: AppService
  ) {}

  ngOnInit(): void {
    this.service.getSchedules().subscribe({
      next: (data) => {
        data.schedules.forEach((dayObj) => {
          dayObj.schedule.sort((a, b) => {
            const [hA, mA] = a.time.split(':').map(Number);
            const [hB, mB] = b.time.split(':').map(Number);
            const totalA = hA * 60 + mA;
            const totalB = hB * 60 + mB;
            return totalA - totalB;
          });
        });
        this.data = data;
      },
      complete: () => {
        this.route.paramMap.subscribe((params) => {
          const dayParam = params.get('day');

          if (dayParam) {
            for (const schedule of this.data.schedules) {
              if (schedule.day === dayParam) {
                this.scheduleDay = schedule;
              }
            }
          } else {
            this.router.navigate(['/']);
          }
        });
      },
    });
  }
}
