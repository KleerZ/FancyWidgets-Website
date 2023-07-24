using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

[Table(nameof(DocsCategory))]
public class DocsCategory : BaseModel
{
    [PrimaryKey(nameof(Id))]
    public int Id { get; set; }
    
    [Column(nameof(Title))]
    public string Title { get; set; } = "";
    
    [Reference(typeof(DocsArticle))]
    public List<DocsArticle> DocsArticles { get; set; } = new();
}