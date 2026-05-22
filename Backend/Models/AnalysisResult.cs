using System.Text.Json.Serialization;

namespace Backend.Models;

public class AnalysisResult
{
    [JsonPropertyName("page")]
    public int Page { get; set; }

    [JsonPropertyName("summary")]
    public Summary Summary { get; set; } = new();

    [JsonPropertyName("errors")]
    public List<ErrorItem> Errors { get; set; } = new();
}

public class Summary
{
    [JsonPropertyName("total_errors")]
    public int TotalErrors { get; set; }

    [JsonPropertyName("intersection_errors")]
    public int IntersectionErrors { get; set; }

    [JsonPropertyName("hatching_errors")]
    public int HatchingErrors { get; set; }

    [JsonPropertyName("text_errors")]
    public int TextErrors { get; set; }
}

public class ErrorItem
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = "";

    [JsonPropertyName("type")]
    public string Type { get; set; } = "";

    [JsonPropertyName("severity")]
    public string Severity { get; set; } = "";

    [JsonPropertyName("message")]
    public string Message { get; set; } = "";

    [JsonPropertyName("bbox")]
    public BBox Bbox { get; set; } = new();

    [JsonPropertyName("metadata")]
    public Dictionary<string, object>? Metadata { get; set; }
}

public class BBox
{
    [JsonPropertyName("x")]
    public double X { get; set; }

    [JsonPropertyName("y")]
    public double Y { get; set; }

    [JsonPropertyName("width")]
    public double Width { get; set; }

    [JsonPropertyName("height")]
    public double Height { get; set; }
}