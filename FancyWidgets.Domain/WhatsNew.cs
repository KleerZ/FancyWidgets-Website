using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

public class WhatsNew : BaseModel
{
    [PrimaryKey(nameof(Id))]
    public int Id { get; set; }

    [Column(nameof(Title))]
    public string Title { get; set; } = "";
    
    [Column(nameof(Text))]
    public string Text { get; set; } = "";
    
    [Column(nameof(Version))]
    public string Version { get; set; } = "";
    
    [Column(nameof(Date))]
    public DateTime Date { get; set; }
}