using Backend.Models;

namespace Backend.Services;

public interface INeuralService
{
    Task<List<AnalysisResult>> AnalyzeAsync(List<string> filePaths);
}