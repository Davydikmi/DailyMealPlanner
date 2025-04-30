namespace DailyMealPlanner.Data
{
    public class Meal
    {
        public string name {  get; set; }
        public List<Product> products { get; set; }

        public double TotalCalories => products.Sum(p => p.Calories);
        public double TotalProtein => products.Sum(p => p.Protein);
        public double TotalFats => products.Sum(p => p.Fats);
        public double TotalCarbs => products.Sum(p => p.Carbs);
        public Meal() 
        {
            name = "";
            products = new List<Product>();
        }

        public Meal(string name, List<Product> products)
        {
            this.name = name;
            this.products = products;
        }

        

    }
}
