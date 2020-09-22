using System;
using System.Globalization;

namespace LeaveManagerTests.Services
{
    public class DateTimeHandler
    {
        public float CalculateDays(String dateStart, String dateEnd)
        {   
            DateTime start = DateTime.ParseExact(dateStart, "d", new CultureInfo("fr-FR"));
            DateTime end = DateTime.ParseExact(dateEnd, "d", new CultureInfo("fr-FR"));
            float days = 0;
            for (DateTime date = start; end.CompareTo(date) >= 0; date = date.AddDays(1.0))
            {
                if(!(date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday))
                {
                    days++;
                }
            }
            return days;
        }
    }
}