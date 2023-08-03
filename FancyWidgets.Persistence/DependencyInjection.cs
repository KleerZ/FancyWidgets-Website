using FancyWidgets.Application.Common.Interfaces;
using FancyWidgets.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FancyWidgets.Persistence;

public static class DependencyInjection
{
    public static void AddPersistence(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContextConfiguration(configuration);
    }

    private static void AddDbContextConfiguration(this IServiceCollection services, 
        IConfiguration configuration)
    {
        var connectionString = configuration["Supabase:SUPABASE_POSTGRES_URL"];

        services.AddDbContext<FancyWidgetsDbContext>(options =>
        {
            options.UseNpgsql(connectionString, o =>
            {
                o.MigrationsAssembly(typeof(FancyWidgetsDbContext).Assembly.FullName);
                o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
            });
        } );
        
        services.AddScoped<IFancyWidgetsDbContext, FancyWidgetsDbContext>();
    }
}