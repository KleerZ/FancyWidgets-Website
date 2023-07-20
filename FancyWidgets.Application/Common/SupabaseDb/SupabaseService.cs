using Postgrest.Models;
using Supabase;
using Supabase.Storage;
using Supabase.Storage.Interfaces;
using Client = Supabase.Client;

namespace FancyWidgets.Application.Common.SupabaseDb;

public class SupabaseService : ISupabaseService
{
    private readonly Client _supabaseClient;
    private readonly IStorageFileApi<FileObject>? _supabaseStorage;

    public SupabaseService(string url, string key, string bucketName, SupabaseOptions supabaseOptions)
    {
        _supabaseClient = new Client(url, key, supabaseOptions);
        _supabaseStorage = _supabaseClient.Storage.From(bucketName);
        _supabaseClient.InitializeAsync();
    }

    public async Task<List<T>> FetchDataFromDb<T>() where T : BaseModel, new()
    {
        var result = await _supabaseClient.From<T>().Get();
        return result.Models;
    }

    public async Task InsertDataToDb<T>(T model) where T : BaseModel, new() =>
        await _supabaseClient.From<T>().Insert(model);

    public async Task<byte[]> GetImageBytes(string path) =>
        await _supabaseStorage!.Download(path, null);
}