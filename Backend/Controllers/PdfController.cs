using Microsoft.AspNetCore.Mvc;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("pdf")]
    public class PdfController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly INeuralService _neuralService;

        public PdfController(IFileService fileService, INeuralService neuralService)
        {
            _fileService = fileService;
            _neuralService = neuralService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Файлы не загружены");

            var savedFiles = new List<string>();

            Console.WriteLine($"Получено {files.Count} файлов");

            foreach (var file in files)
            {
                var path = await _fileService.SaveFileAsync(file);
                savedFiles.Add(path);
            }

            Console.WriteLine($"Сохранено {savedFiles.Count} файлов");

            var analysisResult = await _neuralService.AnalyzeAsync(savedFiles);

            return Ok(analysisResult);
        }
    }
}