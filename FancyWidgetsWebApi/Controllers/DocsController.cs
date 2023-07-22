using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Application.CQs.Docs.Queries.GetAll;
using FancyWidgets.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FancyWidgetsWebApi.Controllers;

[Route("api/docs")]
public class DocsController : BaseController
{
    public DocsController(IMediator mediator) : base(mediator) {}

    [HttpGet("get-all")]
    public async Task<ActionResult<IEnumerable<DocsArticleDto>>> GetAll()
    {
        var getAllDocsArticlesQuery = new GetAllDocsArticlesQuery();
        var docsArticles = await Mediator.Send(getAllDocsArticlesQuery);
        
        return Ok(docsArticles);
    }
}