using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Docs.Queries.GetAll;

public class GetAllDocsArticlesQuery : IRequest<IEnumerable<DocsArticle>>
{
    
}