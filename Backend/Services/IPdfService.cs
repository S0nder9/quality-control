// Сервис для использования кастомной функции сохранения файлов SaveFileAsync, которая находится в файле PdfService.cs, чтобы не засорять код контроллера.
namespace Backend.Services
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file);
    }
}