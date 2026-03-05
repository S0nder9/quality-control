namespace Backend.Services
{
    public class NeuralService : INeuralService
    {
        private readonly HttpClient _httpClient;

        public NeuralService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<object> AnalyzeAsync(List<string> filePaths)
        {
            await Task.Delay(2000);

            var result = new
            {
                page = 1,
                summary = new
                {
                    total_errors = 7,
                    intersection_errors = 3,
                    hatching_errors = 2,
                    text_errors = 2
                },
                errors = new object[]
                {
                    new
                    {
                        id = "err_001",
                        type = "intersection",
                        severity = "high",
                        message = "Неверное пересечение линий",
                        bbox = new { x = 120.5, y = 340.2, width = 10, height = 10 },
                        metadata = new { angle_1 = 45, angle_2 = 90 }
                    },
                    new
                    {
                        id = "err_004",
                        type = "hatching",
                        severity = "medium",
                        message = "Контур не заштрихован",
                        bbox = new { x = 400.0, y = 200.0, width = 150, height = 120 },
                        metadata = new { contour_area = 2340 }
                    },
                    new
                    {
                        id = "err_006",
                        type = "text",
                        severity = "low",
                        message = "Ошибка в обозначении ГОСТ",
                        bbox = new { x = 800.0, y = 950.0, width = 220, height = 40 },
                        metadata = new { detected_text = "ГОС 123-45", suggestion = "ГОСТ 123-45" }
                    }
                }
            };

            return result;
        }
    }
}