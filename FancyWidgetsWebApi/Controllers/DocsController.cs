using FancyWidgets.Application.Common.SupabaseDb;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FancyWidgetsWebApi.Controllers;

[ApiController]
[Route("api/docs")]
public class DocsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ISupabaseService _supabaseService;

    public DocsController(IMediator mediator, ISupabaseService supabaseService)
    {
        _mediator = mediator;
        _supabaseService = supabaseService;
    }

    [HttpGet("get-all")]
    public async Task<ActionResult> GetAll()
    {
        return Ok();
    }
}