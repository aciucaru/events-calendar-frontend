export interface OutOfOfficeEvent
{
    id: number;
    user_id_fk: number;
    description: string;
    start: Date;
    end: Date;
}