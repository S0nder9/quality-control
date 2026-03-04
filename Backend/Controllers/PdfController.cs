using Microsoft.AspNetCore.Mvc;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("pdf")]
    public class PdfController : ControllerBase
    {
        private readonly IFileService _fileService;

        public PdfController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Файлы не загружены");

            var savedFiles = new List<string>(); // Массив строк абсолютных пустей файлов, которые храняться в папке Storage / Originals. Эти файлы были только что сохранены, то есть не все, которые есть в папке. Позже будем отправлять этот пусть нейронке

            Console.WriteLine($"Получено {files.Count} файлов");

            foreach (var file in files)
            {
                var path = await _fileService.SaveFileAsync(file);
                savedFiles.Add(path);
            }

            Console.WriteLine($"Сохранено {savedFiles.Count} файлов");

            // Здесь сделай вызов функции отправки данных нейронке

            return Ok(new
            {
                message = "Файлы успешно загружены",
                files = savedFiles
            }); // Это измени, отправляй json с ошибками, который я тебе скидывал
        }
    }
}