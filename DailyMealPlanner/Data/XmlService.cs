using System;
using System.IO;
using System.Xml.Serialization;

namespace DailyMealPlanner.Data
{
    public class XmlService
    {
        public static FoodCatalog LoadFoodCatalog()
        {
            const string path = @"..\..\..\FoodProducts.xml";
            XmlSerializer serializer = new XmlSerializer(typeof(FoodCatalog));

            using (FileStream fs = new FileStream(path, FileMode.Open))
            {
                return (FoodCatalog)serializer.Deserialize(fs);
            }
        }
    }
}
