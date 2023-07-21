using System.ComponentModel.DataAnnotations.Schema;
using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

[Postgrest.Attributes.Table(nameof(DocsArticle))]
public class DocsArticle : BaseModel
{
    [PrimaryKey]
    public int Id { get; set; }
    
    [ForeignKey("DocsCategoryId")]
    public int DocsCategoryId { get; set; }
    
    [Postgrest.Attributes.Column(nameof(Title))]
    public string Title { get; set; } = "";
    
    [Postgrest.Attributes.Column(nameof(Text))]
    public string Text { get; set; } = "";
    
    [Postgrest.Attributes.Column(nameof(RouterUrl))]
    public string RouterUrl { get; set; } = "";
}