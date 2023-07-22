using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

public class Widget : BaseModel
{
    [PrimaryKey]
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public string DownloadUrl { get; set; } = "";
    public string ImageUrl { get; set; } = "";
}