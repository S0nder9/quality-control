namespace Backend.Models
{
    public class AnalysisResult
    {
        public int Page { get; set; }
        public Summary? Summary { get; set; }
        public List<ErrorItem> Errors { get; set; }
    }

    public class Summary
    {
        public int TotalErrors { get; set; }
        public int IntersectionErrors { get; set; }
        public int HatchingErrors { get; set; }
        public int TextErrors { get; set; }
    }

    public class ErrorItem
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string Severity { get; set; }
        public string Message { get; set; }
        public BBox Bbox { get; set; }
        public Dictionary<string, object> Metadata { get; set; }
    }

    public class BBox
    {
        public double X { get; set; }
        public double Y { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
    }
}