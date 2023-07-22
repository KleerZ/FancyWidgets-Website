using Postgrest;
using Postgrest.Models;
using Supabase.Interfaces;
using Supabase.Realtime;

namespace FancyWidgets.Application.Common.SupabaseDb;

public interface ISupabaseService
{
    public Task<List<T>> FetchDataFromDb<T>() where T : BaseModel, new();

    public Task<List<T>> FetchDataFromDb<T>(Func<ISupabaseTable<T, RealtimeChannel>, Table<T>> action)
        where T : BaseModel, new();
    public Task InsertDataToDb<T>(T model) where T : BaseModel, new();
    public Task<byte[]> GetImageBytes(string path);
}