import { Component, OnInit } from '@angular/core';
import { ISchedules } from '../schedules.interface';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public data: ISchedules = { schedules: [], holidaysDays: [] };

  constructor(private readonly service: AppService) { }

  ngOnInit(): void {
    this.service.getSchedules().subscribe({
      next: (data) => {
        this.data = data;
      }
    });
  }
}