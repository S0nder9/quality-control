using System.Text;
using System.Text.Json;
using Backend.Models;

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
            // var requestBody = new
            // {
            //     files = filePaths
            // };

            // var json = JsonSerializer.Serialize(requestBody);
            // var content = new StringContent(json, Encoding.UTF8, "application/json");

            // var response = await _httpClient.PostAsync(
            //     "http://localhost:8000/analyze", // позже исправить на реальный url нейронки
            //     content);

            // if (!response.IsSuccessStatusCode)
            //     throw new Exception("Ошибка при вызове нейронки");

            //  return await response.Content.ReadAsStringAsync();

            // await Task.Delay(1500);

            var result = new List<AnalysisResult>
    {
        new AnalysisResult
        {
            Page = 1,
            Summary = new Summary
            {
                TotalErrors = 7,
                IntersectionErrors = 3,
                HatchingErrors = 2,
                TextErrors = 2
            },
            Errors = new List<ErrorItem>
            {
                new ErrorItem
                {
                    Id = "err_001",
                    Type = "intersection",
                    Severity = "high",
                    Message = "Неверное пересечение линий",
                    Bbox = new BBox
                    {
                        X = 120.5,
                        Y = 340.2,
                        Width = 10,
                        Height = 10
                    },
                    Metadata = new Dictionary<string, object>
                    {
                        { "angle_1", 45 },
                        { "angle_2", 90 }
                    }
                }
            }
        }
    };

            return result;
        }
    }
}