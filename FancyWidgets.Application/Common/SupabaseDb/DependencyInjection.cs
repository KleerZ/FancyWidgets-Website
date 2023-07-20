using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Supabase;

namespace FancyWidgets.Application.Common.SupabaseDb;

public static class DependencyInjection
{
    public static void AddSupabaseService(this IServiceCollection services,
        IConfiguration configuration)
    {
        var url = configuration["Supabase:SUPABASE_URL"];
        var key = configuration["Supabase:SUPABASE_KEY"];
        var bucketName = configuration["Supabase:SUPABASE_BUCKETNAME"];
        var options = new SupabaseOptions { AutoConnectRealtime = true };

        if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(key) || string.IsNullOrEmpty(bucketName))
            throw new NullReferenceException("Missing data for Supabase");

        services.AddSingleton<ISupabaseService, SupabaseService>(_ =>
            new SupabaseService(url, key, bucketName, options));
    }
}