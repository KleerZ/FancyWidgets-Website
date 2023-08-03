using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Widgets.GetById;

public class GetWidgetByIdQuery : IRequest<Widget?>
{
    public int Id { get; set; }
    
    public GetWidgetByIdQuery(int id)
    {
        Id = id;
    }
}