import { MeetingEvent } from "./meeting-event";

export interface MeetingAppointment
{
    id: number;
    meeting_id_fk: number;
    active: boolean;
    start: Date;
    end: Date;
    meeting_event: MeetingEvent;
}