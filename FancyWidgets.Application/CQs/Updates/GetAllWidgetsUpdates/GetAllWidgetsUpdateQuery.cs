using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Updates.GetAllWidgetsUpdates;

public class GetAllWidgetsUpdateQuery : IRequest<IEnumerable<WhatsNew>>
{
    
}