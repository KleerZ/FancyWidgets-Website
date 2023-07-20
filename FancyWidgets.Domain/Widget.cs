using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

[Table("Widget")]
public class Widget : BaseModel
{
    [PrimaryKey("id")]
    public int Id { get; set; }
    
    [Column("name")]
    public string Name { get; set; } = "";
    
    [Column("description")]
    public string Description { get; set; } = "";
    
    [Column("download-url")]
    public string DownloadUrl { get; set; } = "";

    [Column("image-url")]
    public string ImageUrl { get; set; } = "";
}