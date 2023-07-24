using System.ComponentModel.DataAnnotations.Schema;
using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

[Postgrest.Attributes.Table(nameof(WhatsNew))]
public class WhatsNew : BaseModel
{
    [PrimaryKey(nameof(Id))]
    public int Id { get; set; }
    
    [ForeignKey("WidgetId")]
    public int WidgetId { get; set; }

    [Postgrest.Attributes.Column(nameof(Title))]
    public string Title { get; set; } = "";
    
    [Postgrest.Attributes.Column(nameof(Text))]
    public string Text { get; set; } = "";
    
    [Postgrest.Attributes.Column(nameof(Version))]
    public string Version { get; set; } = "";
    
    [Postgrest.Attributes.Column(nameof(Date))]
    public DateTime Date { get; set; }
}