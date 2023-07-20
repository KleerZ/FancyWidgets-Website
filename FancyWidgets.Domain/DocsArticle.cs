using Postgrest.Attributes;

namespace FancyWidgets.Domain;

[Table("DocsArticle")]
public class DocsArticle
{
    [PrimaryKey("id")]
    public int Id { get; set; }
    
    [Column("title")]
    public string Title { get; set; } = "";
    
    [Column("text")]
    public string Text { get; set; } = "";
}