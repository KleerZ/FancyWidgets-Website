using FancyWidgets.Application.CQs.Updates.GetAll;
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
}