using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

public class Widget : BaseModel
{
    [PrimaryKey(nameof(Id))]
    public int Id { get; set; }
    
    [Column(nameof(Name))]
    public string Name { get; set; } = "";
    
    [Column(nameof(Description))]
    public string Description { get; set; } = "";
    
    [Column(nameof(DownloadUrl))]
    public string DownloadUrl { get; set; } = "";
    
    [Column(nameof(ImageUrl))]
    public string ImageUrl { get; set; } = "";
}