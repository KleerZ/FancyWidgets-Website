using System.ComponentModel.DataAnnotations.Schema;
using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

[Postgrest.Attributes.Table(nameof(Widget))]
public class Widget : BaseModel
{
    [PrimaryKey(nameof(Id))]
    public int Id { get; set; }
    
    [Postgrest.Attributes.Column(nameof(Name))]
    public string Name { get; set; } = "";
    
    [Postgrest.Attributes.Column(nameof(Description))]
    public string Description { get; set; } = "";
    
    [Postgrest.Attributes.Column(nameof(DownloadUrl))]
    public string DownloadUrl { get; set; } = "";
    
    [Postgrest.Attributes.Column(nameof(ImageUrl))]
    public string ImageUrl { get; set; } = "";

    [Postgrest.Attributes.Column(nameof(Version))]
    public string Version { get; set; } = "";
    
    [Reference(typeof(WhatsNew))]
    public List<WhatsNew> WhatsNews { get; set; } = new();
}