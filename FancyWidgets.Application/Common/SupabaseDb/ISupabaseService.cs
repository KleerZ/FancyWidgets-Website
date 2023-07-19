using Postgrest.Models;

namespace FancyWidgets.Application.Common.SupabaseDb;

public interface ISupabaseService
{
    public Task<List<T>> FetchData<T>() where T : BaseModel, new();
    public Task InsertData<T>(T model) where T : BaseModel, new();
}