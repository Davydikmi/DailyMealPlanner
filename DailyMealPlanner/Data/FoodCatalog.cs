using System.Xml.Serialization;
using System.Collections.Generic;

namespace DailyMealPlanner.Data
{
    [XmlRoot("Db")]
    public class FoodCatalog
    {
        [XmlElement("Category")]
        public List<Category> Categories { get; set; }
    }
}
