using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Docs.Queries.GetAll;

public class GetAllDocsArticlesQueryHandler
    : IRequestHandler<GetAllDocsArticlesQuery, IEnumerable<DocsArticle>>
{
    private readonly ISupabaseService _supabaseService;

    public GetAllDocsArticlesQueryHandler(ISupabaseService supabaseService) =>
        _supabaseService = supabaseService;

    public async Task<IEnumerable<DocsArticle>> Handle(GetAllDocsArticlesQuery request,
        CancellationToken cancellationToken) => await _supabaseService.FetchDataFromDb<DocsArticle>();
}