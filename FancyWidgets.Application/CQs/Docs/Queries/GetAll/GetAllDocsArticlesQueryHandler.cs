using AutoMapper;
using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Docs.Queries.GetAll;

public class GetAllDocsArticlesQueryHandler
    : IRequestHandler<GetAllDocsArticlesQuery, IEnumerable<DocsArticleDto>>
{
    private readonly ISupabaseService _supabaseService;
    private readonly IMapper _mapper;

    public GetAllDocsArticlesQueryHandler(ISupabaseService supabaseService, IMapper mapper)
    {
        _supabaseService = supabaseService;
        _mapper = mapper;
    }

    public async Task<IEnumerable<DocsArticleDto>> Handle(GetAllDocsArticlesQuery request,
        CancellationToken cancellationToken)
    {
        var articles = (await _supabaseService.FetchDataFromDb<DocsCategory>())
            .SelectMany(docsCategory => docsCategory.DocsArticles
                .Select(docsCategoryDocsArticle =>
                {
                    var article = _mapper.Map<DocsArticleDto>(docsCategoryDocsArticle);
                    article.Category = docsCategory.Title;
                    return article;
                }));

        return articles;
    }
}