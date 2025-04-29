using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace DailyMealPlanner.Data
{
    public class Person
    {
        public double weight { get; set; }
        public double height { get; set; }
        public int age { get; set; }
        public double Activity { get; set; }
        public double calories { get; set; }

        public double CalculateCalories()
        {
            double bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
            Console.WriteLine("калории посчитаны");
            return calories = Math.Round(bmr * Activity);
        }
    }
}
