export interface Invitation
{
    id: number;
    appointment_id_fk: number;
    guest_user_id_fk: number;
    guest_answer: number;
}