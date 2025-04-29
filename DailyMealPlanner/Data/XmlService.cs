using System;
using System.IO;
using System.Text;
using System.Xml.Serialization;

namespace DailyMealPlanner.Data
{
    public class XmlService
    {
        public static FoodCatalog LoadFoodCatalog()
        {
            const string path = "FoodProducts.xml";
            XmlSerializer serializer = new XmlSerializer(typeof(FoodCatalog));

            string xmlContent = File.ReadAllText(path, Encoding.UTF8);
            xmlContent = FixDecimalSeparators(xmlContent);
            using (StringReader reader = new StringReader(xmlContent))
            {
                return (FoodCatalog)serializer.Deserialize(reader);
            }
        }

        // Функция для замены ',' на '.' в десереализуемых данных
        private static string FixDecimalSeparators(string xmlContent)
        {
            xmlContent = xmlContent
                .Replace("<Protein>", "<Protein>")
                .Replace(",", ".", System.StringComparison.Ordinal)
                .Replace("<Fats>", "<Fats>")
                .Replace(",", ".", System.StringComparison.Ordinal)
                .Replace("<Carbs>", "<Carbs>")
                .Replace(",", ".", System.StringComparison.Ordinal)
                .Replace("<Calories>", "<Calories>")
                .Replace(",", ".", System.StringComparison.Ordinal);

            return xmlContent;
        }
    }
}
