export interface MeetingEvent
{
    id: number;
    host_user_id_fk: number;
    location_id_fk: number;
    title: string;
    description: string;
}