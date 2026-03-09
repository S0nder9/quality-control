using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Backend.Services;
using Backend.Controllers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddHttpClient<INeuralService, NeuralService>();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowReactDev");

app.MapControllers();

app.Run();