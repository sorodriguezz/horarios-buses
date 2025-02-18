export interface ISchedules {
    schedules: Schedule[];
    holidaysDays: HolidaysDay[];
}

export interface HolidaysDay {
    day: string;
    month: string;
    name: string;
}

export interface Schedule {
    day: string;
    schedule: Day[];
}

export interface Day {
    time: string;
    from: string;
    to: string;
    additional: string;
    company: string;
}

export interface Saturday {
    time: string;
    ruta: string;
    company: string;
}
