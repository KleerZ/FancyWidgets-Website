using Postgrest.Attributes;
using Postgrest.Models;

namespace FancyWidgets.Domain;

public class WhatsNew : BaseModel
{
    [PrimaryKey]
    public int Id { get; set; }

    public string Title { get; set; } = "";
    public string Text { get; set; } = "";
    public string Version { get; set; } = "";
    public DateTime Date { get; set; }
}