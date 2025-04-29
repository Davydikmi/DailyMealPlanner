namespace DailyMealPlanner.Data
{
    public class Meal
    {
        public string name {  get; set; }
        public List<Product> products { get; set; }

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
