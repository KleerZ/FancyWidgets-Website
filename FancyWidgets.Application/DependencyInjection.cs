using System.Reflection;
using FancyWidgets.Application.Common.SupabaseDb;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FancyWidgets.Application;

public static class DependencyInjection
{
    public static void AddApplication(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        services.AddSupabaseService(configuration);
    }
}