using FancyWidgets.Application.CQs.Updates.GetAll;
using FancyWidgets.Application.CQs.Updates.GetAllApplicationUpdates;
using FancyWidgets.Application.CQs.Updates.GetAllWidgetsUpdates;
using FancyWidgets.Application.CQs.Updates.GetByWidgetId;
using FancyWidgets.Application.CQs.Updates.GetRange;
using FancyWidgets.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FancyWidgetsWebApi.Controllers;

[Route("api/whats-new")]
public class WhatsNewController : BaseController
{
    public WhatsNewController(IMediator mediator) : base(mediator) {}

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WhatsNew>>> GetAll()
    {
        var getAllUpdatesQuery = new GetAllUpdatesQuery();
        var updates = await Mediator.Send(getAllUpdatesQuery);
        
        return Ok(updates);
    }

    [HttpGet("get-range")]
    public async Task<ActionResult<IEnumerable<WhatsNew>>> GetRange(int from, int to)
    {
        var getUpdatesRangeQuery = new GetUpdatesRangeQuery(from, to);
        var updates = await Mediator.Send(getUpdatesRangeQuery);

        return Ok(updates);
    }

    [HttpGet("get-by-widget-id/{id:int}")]
    public async Task<ActionResult<IEnumerable<WhatsNew>>> GetByWidgetId(int id)
    {
        var getUpdatesByWidgetIdQuery = new GetUpdatesByWidgetIdQuery(id);
        var updates = await Mediator.Send(getUpdatesByWidgetIdQuery);

        return Ok(updates);
    }
    
    [HttpGet("get-all-widgets-updates")]
    public async Task<ActionResult<IEnumerable<WhatsNew>>> GetAllWidgetsUpdate()
    {
        var getAllWidgetsUpdatesQuery = new GetAllWidgetsUpdateQuery();
        var updates = await Mediator.Send(getAllWidgetsUpdatesQuery);

        return Ok(updates);
    }

    [HttpGet("get-all-application-updates")]
    public async Task<ActionResult<IEnumerable<WhatsNew>>> GetAllApplicationUpdate()
    {
        var getAllApplicationUpdatesQuery = new GetAllApplicationUpdatesQuery();
        var updates = await Mediator.Send(getAllApplicationUpdatesQuery);

        return Ok(updates);
    }
}