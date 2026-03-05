namespace Backend.Services
{
    public interface INeuralService
    {
        Task<object> AnalyzeAsync(List<string> filePaths);
    }
}