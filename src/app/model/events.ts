import { User } from "./user";

export interface MeetingEvent
{
    id: number;
    host_user_id_fk: number;
    location_id_fk: number;
    title: string;
    description: string;
}

export interface MeetingAppointment
{
    id: number;
    meeting_id_fk: number;
    active: boolean;
    start: Date;
    end: Date;
    meeting_event: MeetingEvent;
}

export interface OutOfOfficeEvent
{
    id: number;
    user_id_fk: number;
    description: string;
    start: Date;
    end: Date;
}

export interface Invitation
{
    id: number;
    appointment_id_fk: number;
    guest_user_id_fk: number;
    guest_answer: number;
    guest_user: User;
}