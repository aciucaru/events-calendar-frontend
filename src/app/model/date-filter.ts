export interface DateFilter
{
    year: number;
    month: number; // from 1 to 12
    week: number; 
}

export interface WeekInterval
{
    weekStart: Date;
    weekEnd: Date;
}