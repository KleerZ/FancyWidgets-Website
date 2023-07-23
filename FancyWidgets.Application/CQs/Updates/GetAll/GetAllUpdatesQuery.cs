using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Updates.GetAll;

public class GetAllUpdatesQuery : IRequest<IEnumerable<WhatsNew>>
{
    
}