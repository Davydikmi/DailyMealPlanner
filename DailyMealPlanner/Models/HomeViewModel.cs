using DailyMealPlanner.Data;

namespace DailyMealPlanner.Models
{
    public class HomeViewModel
    {
        public Person person { get; set; } = new Person();
        public MealService mealService { get; set; } = new MealService();

    }

}
