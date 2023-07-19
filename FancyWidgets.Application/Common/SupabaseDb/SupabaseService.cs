using Postgrest.Models;
using Supabase;

namespace FancyWidgets.Application.Common.SupabaseDb;

public class SupabaseService : ISupabaseService
{
    private readonly Client _supabaseClient;

    public SupabaseService(string url, string key, SupabaseOptions supabaseOptions)
    {
        _supabaseClient = new Client(url, key, supabaseOptions);
        _supabaseClient.InitializeAsync();
    }

    public async Task<List<T>> FetchData<T>() where T : BaseModel, new()
    {
        var result = await _supabaseClient.From<T>().Get();
        return result.Models;
    }

    public async Task InsertData<T>(T model) where T : BaseModel, new() =>
        await _supabaseClient.From<T>().Insert(model);
}