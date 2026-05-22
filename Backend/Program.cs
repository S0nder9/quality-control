using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IPdfAnnotationService, PdfAnnotationService>();

builder.Services.AddHttpClient<INeuralService, NeuralService>();

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowReactDev");

app.MapControllers();

app.Run();