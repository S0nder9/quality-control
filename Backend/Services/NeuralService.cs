using Backend.Models;

namespace Backend.Services;

public class NeuralService : INeuralService
{
    private readonly HttpClient _httpClient;

    public NeuralService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<AnalysisResult>> AnalyzeAsync(List<string> filePaths)
    {
        await Task.Delay(500);

        return new List<AnalysisResult>
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
                    },
                    new ErrorItem
                    {
                        Id = "err_004",
                        Type = "hatching",
                        Severity = "medium",
                        Message = "Контур не заштрихован",
                        Bbox = new BBox
                        {
                            X = 400,
                            Y = 200,
                            Width = 150,
                            Height = 120
                        },
                        Metadata = new Dictionary<string, object>
                        {
                            { "contour_area", 2340 }
                        }
                    },
                    new ErrorItem
                    {
                        Id = "err_006",
                        Type = "text",
                        Severity = "low",
                        Message = "Ошибка в обозначении ГОСТ",
                        Bbox = new BBox
                        {
                            X = 800,
                            Y = 950,
                            Width = 220,
                            Height = 40
                        },
                        Metadata = new Dictionary<string, object>
                        {
                            { "detected_text", "ГОС 123-45" },
                            { "suggestion", "ГОСТ 123-45" }
                        }
                    }
                }
            }
        };
    }
}