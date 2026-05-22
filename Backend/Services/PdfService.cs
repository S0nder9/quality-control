namespace Backend.Services;

public class FileService : IFileService
{
    private readonly string _uploadPath;

    private readonly string[] _allowedExtensions =
    {
        ".pdf", ".pptx"
    };

    public FileService(IWebHostEnvironment env)
    {
        _uploadPath = Path.Combine(
            env.ContentRootPath,
            "Storage",
            "Originals"
        );

        Directory.CreateDirectory(_uploadPath);
    }

    public async Task<string> SaveFileAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new Exception("Файл пустой");

        var extension = Path.GetExtension(file.FileName).ToLower();

        if (!_allowedExtensions.Contains(extension))
            throw new Exception("Недопустимый тип файла. Загружай только PDF.");

        var originalName = Path.GetFileNameWithoutExtension(file.FileName);

        foreach (var c in Path.GetInvalidFileNameChars())
            originalName = originalName.Replace(c, '_');

        var timestamp = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss");
        var shortGuid = Guid.NewGuid().ToString()[..8];

        var finalFileName = $"{originalName}_{timestamp}_{shortGuid}{extension}";
        var filePath = Path.Combine(_uploadPath, finalFileName);

        await using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return filePath;
    }
}