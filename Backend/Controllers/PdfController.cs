using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("pdf")]
public class PdfController : ControllerBase
{
    private readonly IFileService _fileService;
    private readonly INeuralService _neuralService;
    private readonly IPdfAnnotationService _annotationService;

    public PdfController(
        IFileService fileService,
        INeuralService neuralService,
        IPdfAnnotationService annotationService
    )
    {
        _fileService = fileService;
        _neuralService = neuralService;
        _annotationService = annotationService;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(List<IFormFile> files)
    {
        if (files == null || files.Count == 0)
            return BadRequest("Файлы не загружены");

        var savedFiles = new List<string>();

        foreach (var file in files)
        {
            var path = await _fileService.SaveFileAsync(file);
            savedFiles.Add(path);
        }

        var analysisResult = await _neuralService.AnalyzeAsync(savedFiles);

        var annotatedFiles = new List<string>();

        foreach (var filePath in savedFiles)
        {
            var annotatedPath = await _annotationService.AnnotateAsync(
                filePath,
                analysisResult
            );

            var fileName = Path.GetFileName(annotatedPath);
            annotatedFiles.Add($"/pdf/download/{fileName}");
        }

        return Ok(new
        {
            analysis = analysisResult,
            annotatedFiles
        });
    }

    [HttpGet("download/{fileName}")]
    public IActionResult Download(string fileName)
    {
        var safeFileName = Path.GetFileName(fileName);

        var filePath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Storage",
            "Annotated",
            safeFileName
        );

        if (!System.IO.File.Exists(filePath))
            return NotFound("Файл не найден");

        return PhysicalFile(filePath, "application/pdf", safeFileName);
    }
}