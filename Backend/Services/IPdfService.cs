namespace Backend.Services;

public interface IFileService
{
    Task<string> SaveFileAsync(IFormFile file);
}