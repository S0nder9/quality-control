using Backend.Models;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf.IO;

namespace Backend.Services;

public class PdfAnnotationService : IPdfAnnotationService
{
    public Task<string> AnnotateAsync(string pdfPath, List<AnalysisResult> analysis)
    {
        var outputDir = Path.Combine(Path.GetDirectoryName(pdfPath)!, "..", "Annotated");
        Directory.CreateDirectory(outputDir);

        var outputPath = Path.Combine(
            outputDir,
            $"annotated_{Path.GetFileName(pdfPath)}"
        );

        var document = PdfReader.Open(pdfPath, PdfDocumentOpenMode.Modify);

        foreach (var pageResult in analysis)
        {
            var pageIndex = pageResult.Page - 1;
            if (pageIndex < 0 || pageIndex >= document.Pages.Count)
                continue;

            var page = document.Pages[pageIndex];
            using var gfx = XGraphics.FromPdfPage(page, XGraphicsPdfPageOptions.Append);

            foreach (var error in pageResult.Errors)
            {
                var color = error.Severity switch
                {
                    "high" => XColors.Red,
                    "medium" => XColors.Orange,
                    "low" => XColors.Gold,
                    _ => XColors.Blue
                };

                var pen = new XPen(color, 2);
                var font = new XFont("Arial", 8);

                var x = error.Bbox.X;
                var y = error.Bbox.Y;
                var w = error.Bbox.Width;
                var h = error.Bbox.Height;

                gfx.DrawRectangle(pen, x, y, w, h);
                gfx.DrawString($"{error.Id}: {error.Message}", font, new XSolidBrush(color), x, y - 4);
            }
        }

        document.Save(outputPath);
        return Task.FromResult(outputPath);
    }
}