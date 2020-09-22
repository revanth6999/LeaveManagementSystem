using NUnit.Framework;
using LeaveManagerTests.Services;

namespace LeaveManagerTests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        [TestCase("21/09/2020", "21/09/2020", 1)]
        [TestCase("22/09/2020", "29/09/2020", 6)]
        [TestCase("25/09/2020", "24/09/2020", 0)]
        public void CalculateDays_WhenCalled_ReturnCountOfWeekDaysInRange(string startDate, string endDate, float days)
        {
            var dateTimeHandler = new DateTimeHandler();

            var result = dateTimeHandler.CalculateDays(startDate, endDate);

            Assert.That(result, Is.EqualTo(days));
        }
    }
}