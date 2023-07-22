using Postgrest.Models;

namespace FancyWidgets.Application.Common.SupabaseDb;

public interface ISupabaseService
{
    public Task<List<T>> FetchDataFromDb<T>() where T : BaseModel, new();
    public Task InsertDataToDb<T>(T model) where T : BaseModel, new();
    public Task<byte[]> GetImageBytes(string path);
}