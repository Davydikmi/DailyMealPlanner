using System.Xml.Serialization;

namespace DailyMealPlanner.Data
{
    public class Category
    {
        [XmlAttribute("name")]
        public string Name { get; set; }

        [XmlAttribute("description")]
        public string Description { get; set; }

        [XmlElement("Product")]
        public List<Product> Products { get; set; }
    }
}
