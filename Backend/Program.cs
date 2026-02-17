using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;
using PdfSharpCore.Drawing;
using UglyToad.PdfPig;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/upload-pdf", async (IFormFile myFile) =>
{
    if (myFile == null || myFile.Length == 0)
        return Results.BadRequest("Файл не загружен");

    using var stream = new MemoryStream();
    await myFile.CopyToAsync(stream);

    bool isValid = true;
    string errorText = "";

    // ПРОВЕРКА
    try
    {
        stream.Position = 0;
        using (var pdfDocument = UglyToad.PdfPig.PdfDocument.Open(stream))
        {
            var allText = "";
            foreach (var page in pdfDocument.GetPages())
            {
                allText += page.Text + " ";
            }

            if (!allText.Contains("КАЛАШНИКОВ", StringComparison.OrdinalIgnoreCase))
            {
                isValid = false;
                errorText = "ОШИБКА: В документе не найдено слово 'КАЛАШНИКОВ'!";
            }
        }
    }
    catch (Exception ex)
    {
        isValid = false;
        errorText = $"ОШИБКА чтения PDF: {ex.Message}";
    }

    // РЕЗУЛЬТАТ
    if (isValid)
    {
        var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        if (!Directory.Exists(uploadsDir)) Directory.CreateDirectory(uploadsDir);

        var filePath = Path.Combine(uploadsDir, myFile.FileName);
        stream.Position = 0;
        using var fileStream = new FileStream(filePath, FileMode.Create);
        await stream.CopyToAsync(fileStream);

        return Results.Text("Файл успешно сохранен!");
    }
    else
    {
        try
        {
            stream.Position = 0;
            using var document = PdfReader.Open(stream, PdfDocumentOpenMode.Modify);
            var page = document.Pages[0];
            using var gfx = XGraphics.FromPdfPage(page);
            var font = new XFont("Arial", 20, XFontStyle.Bold);

            gfx.DrawString(errorText, font, XBrushes.Red,
                new XRect(0, 20, page.Width, page.Height), XStringFormats.TopCenter);

            using var outStream = new MemoryStream();
            document.Save(outStream, false);
            return Results.File(outStream.ToArray(), "application/pdf", "checked_with_errors.pdf");
        }
        catch (Exception ex)
        {
            return Results.Problem($"Ошибка генерации ответа: {ex.Message}");
        }
    }
})
.DisableAntiforgery();

app.Run();