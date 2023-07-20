using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

[Table("DocsArticle")]
public class DocsArticle : BaseModel
{
    [PrimaryKey("id")]
    public int Id { get; set; }
    
    [Column("title")]
    public string Title { get; set; } = "";
    
    [Column("text")]
    public string Text { get; set; } = "";
    
    [Column("router-url")]
    public string RouterUrl { get; set; } = "";
}