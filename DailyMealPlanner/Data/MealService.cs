namespace DailyMealPlanner.Data
{
    public class MealService
    {
        // Service layer
        public FoodCatalog foodcatalog = XmlService.LoadFoodCatalog();
        public Meal breakfast { get; set; } = new Meal();
        public Meal lunch { get; set; } = new Meal();
        public Meal dinner { get; set; } = new Meal();

        public double TotalDayCalories => breakfast.TotalCalories + lunch.TotalCalories + dinner.TotalCalories;
        public double TotalDayProtein => breakfast.TotalProtein + lunch.TotalProtein + dinner.TotalProtein;
        public double TotalDayFats => breakfast.TotalFats + lunch.TotalFats + dinner.TotalFats;
        public double TotalDayCarbs => breakfast.TotalCarbs + lunch.TotalCarbs + dinner.TotalCarbs;



    }
}
