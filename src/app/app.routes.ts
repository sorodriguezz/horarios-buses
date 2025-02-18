import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    { path: 'schedule/:day', component: SchedulesComponent },
    {
        path: 'contact', component: ContactComponent
    }
    // { path: '**', redirectTo: '' }
];
