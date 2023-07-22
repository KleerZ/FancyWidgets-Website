using FancyWidgets.Application.CQs.Widgets.GetAll;
using FancyWidgets.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FancyWidgetsWebApi.Controllers;

[ApiController]
[Route("api/widgets")]
public class WidgetController : ControllerBase
{
    private readonly IMediator _mediator;

    public WidgetController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Widget>>> GetAll()
    {
        var getAllWidgetsQuery = new GetAllWidgetsQuery();
        var widgets = await _mediator.Send(getAllWidgetsQuery);
        
        return Ok(widgets);
    }
}