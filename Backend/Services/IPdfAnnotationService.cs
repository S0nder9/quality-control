using Backend.Models;

namespace Backend.Services;

public interface IPdfAnnotationService
{
    Task<string> AnnotateAsync(string pdfPath, List<AnalysisResult> analysis);
}