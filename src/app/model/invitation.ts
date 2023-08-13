import { User } from "./user";

export interface Invitation
{
    id: number;
    appointment_id_fk: number;
    guest_user_id_fk: number;
    guest_answer: number;
    guest_user: User;
}