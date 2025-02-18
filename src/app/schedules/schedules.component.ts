import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ISchedules, Schedule } from '../schedules.interface';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedules',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.scss',
})
export class SchedulesComponent implements OnInit {
  public data: ISchedules = { schedules: [], holidaysDays: [] };
  public scheduleDay: Schedule = {
    day: '',
    schedule: [],
  };

  public filterCompany: string = '';
  public filterTime: string = '';
  public filterStartTime: string = '';
  public filterEndTime: string = '';
  public showScrollButton: boolean = false;

  get uniqueCompanies(): string[] {
    const companies = this.scheduleDay.schedule.map(item => item.company);
    return Array.from(new Set(companies));
  }

  get filteredSchedule() {
    return this.scheduleDay.schedule.filter(dayObj => {
      const meetsCompany = this.filterCompany ?
        dayObj.company === this.filterCompany : true;
      const meetsTime = this.filterTime ?
        dayObj.time.includes(this.filterTime) : true;

      const toMinutes = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
      };

      let meetsRange = true;
      if (this.filterStartTime) {
        meetsRange = toMinutes(dayObj.time) >= toMinutes(this.filterStartTime);
      }
      if (meetsRange && this.filterEndTime) {
        meetsRange = toMinutes(dayObj.time) <= toMinutes(this.filterEndTime);
      }
      return meetsCompany && meetsTime && meetsRange;
    });
  }

  resetFilters() {
    this.filterCompany = '';
    this.filterTime = '';
    this.filterStartTime = '';
    this.filterEndTime = '';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly service: AppService
  ) { }

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
