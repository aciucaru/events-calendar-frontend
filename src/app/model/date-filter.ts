import { Invitation } from "./invitation";
import { MeetingAppointment } from "./meeting-appointment";
import { OutOfOfficeEvent } from "./out-of-office-event";

export interface DateFilter
{
    year: number;
    month: number; // from 1 to 12
    weekIndex: number; // from 0 to 5
}

export interface SingleWeekInterval
{
    weekStart: Date; // the first day of week, could be different tha Monday
    weekEnd: Date; // the last day of the week, could be different than Sunday
}

export class SingleDayHostedAppointments
{
    private hostedAppointmentArray: Array<MeetingAppointment>;

    public constructor()
    {
        this.hostedAppointmentArray = new Array<MeetingAppointment>(5 * 5 * 8 * 4);
    }
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