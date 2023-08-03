using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Widgets.GetAll;

public class GetAllWidgetsQuery : IRequest<IEnumerable<Widget>>
{
    
}