namespace DailyMealPlanner.Data
{
    public class MealService
    {
        // Service layer
        public FoodCatalog foodcatalog = XmlService.LoadFoodCatalog();
        public Meal breakfast { get; set; } = new Meal();
        public Meal lunch { get; set; } = new Meal();
        public Meal dinner { get; set; } = new Meal();



    }
}
