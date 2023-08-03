using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Updates.GetByWidgetId;

public class GetUpdatesByWidgetIdQuery : IRequest<IEnumerable<WhatsNew>>
{
    public int Id { get; set; }

    public GetUpdatesByWidgetIdQuery(int id)
    {
        Id = id;
    }
}