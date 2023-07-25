using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Updates.GetAllApplicationUpdates;

public class GetAllApplicationUpdatesQuery : IRequest<IEnumerable<WhatsNew>>
{
    
}