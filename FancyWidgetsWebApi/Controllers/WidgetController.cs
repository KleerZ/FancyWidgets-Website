using FancyWidgets.Application.CQs.Widgets.GetAll;
using FancyWidgets.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FancyWidgetsWebApi.Controllers;

[Route("api/widgets")]
public class WidgetController : BaseController
{
    public WidgetController(IMediator mediator) : base(mediator) {}

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Widget>>> GetAll()
    {
        var getAllWidgetsQuery = new GetAllWidgetsQuery();
        var widgets = await Mediator.Send(getAllWidgetsQuery);
        
        return Ok(widgets);
    }
}