using System;
using System.ComponentModel.DataAnnotations;

namespace DailyMealPlanner.Data
{
    public class Person
    {
        [Required]
        public double weight { get; set; }
        [Required]
        public double height { get; set; }
        [Required]
        public int age { get; set; }
        public double calories { get; set; }


    }
}
