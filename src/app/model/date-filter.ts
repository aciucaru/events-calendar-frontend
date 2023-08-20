import { Invitation, MeetingAppointment, OutOfOfficeEvent } from "./events";


export interface DateFilter
{
    year: number;
    month: number; // from 1 to 12
    weekIndex: number; // from 0 to 5
}

export class SingleWeekInterval
{
    private weekStart: Date; // the first day of week, could be different tha Monday
    private weekEnd: Date; // the last day of the week, could be different than Sunday

    constructor(weekStart: Date, weekEnd: Date)
    {
        if(weekStart != null && weekEnd != null)
        {
            this.weekStart = weekStart;
            this.weekEnd = weekEnd;
        }
        else
        {
            this.weekStart = new Date();
            this.weekEnd = new Date();
        }
    }

    public setStart(weekStart: Date): void
    {
        if(weekStart != null)
            this.weekStart = weekStart;
    }

    public setEnd(weekEnd: Date): void
    {
        if(weekEnd != null)
            this.weekEnd = weekEnd;
    }

    public getStart(): Date { return this.weekStart; }
    public getEnd(): Date { return this.weekEnd; }

    public calculateNumOfDays(): number
    {
        const numberOfDays
                = 1 + Math.round((this.weekEnd.getTime() - this.weekStart.getTime()) / (1000 * 3600 * 24));
        // console.log(`number of days in week: ${numberOfDays}`);

        return numberOfDays;
    }

    public calculateDaysOfCurrentWeek(): Array<Date>
    {
        const numberOfDays = this.calculateNumOfDays();
        const startDaysOfCurrentWeek: Array<Date> = new Array<Date>(numberOfDays);

        let currentWeekFirstDay: Date = new Date(this.weekStart);

        for(let i=0; i<numberOfDays; i++)
        {
            currentWeekFirstDay = new Date(this.weekStart);
            currentWeekFirstDay.setDate(this.weekStart.getDate() + i); // calculate the first day of current week 

            startDaysOfCurrentWeek[i] = currentWeekFirstDay; // assign first day to arrays of dates
        }

        // console.log(startDaysOfCurrentWeek);
        
        return startDaysOfCurrentWeek;
    }
}

export class SingleDayHostedAppointments
{
    private hostedAppointmentArray: Array<MeetingAppointment>;

    public constructor()
    {
        this.hostedAppointmentArray = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
    }

    public setArray(hostedAppointmentArray: Array<MeetingAppointment>): void
    {
        if(hostedAppointmentArray != null)
            this.hostedAppointmentArray = hostedAppointmentArray;
    }

    public getArray(): Array<MeetingAppointment> { return this.hostedAppointmentArray; }
}

export class SingleDayInvitations
{
    private invitationArray: Array<Invitation>;

    public constructor()
    {
        this.invitationArray = new Array<Invitation>(5 * 5 * 8 * 8)
    }
}

export class SingleDayOutOfOfficeEvents
{
    private outOfOfficeEventArray: Array<OutOfOfficeEvent>;

    public constructor()
    {
        this.outOfOfficeEventArray = new Array<OutOfOfficeEvent>(5 * 5 * 4);
    }
}