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