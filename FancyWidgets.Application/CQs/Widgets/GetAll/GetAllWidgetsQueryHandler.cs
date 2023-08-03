using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Widgets.GetAll;

public class GetAllWidgetsQueryHandler : IRequestHandler<GetAllWidgetsQuery, IEnumerable<Widget>>
{
    private readonly ISupabaseService _supabaseService;

    public GetAllWidgetsQueryHandler(ISupabaseService supabaseService) =>
        _supabaseService = supabaseService;

    public async Task<IEnumerable<Widget>> Handle(GetAllWidgetsQuery request,
        CancellationToken cancellationToken)
    {
        var result = await _supabaseService.FetchDataFromDb<Widget>();
        var widgets = result.GroupBy(w => w.Name)
            .Select(g => g.OrderByDescending(w => new Version(w.Version)).First());

        return widgets;
    }
}