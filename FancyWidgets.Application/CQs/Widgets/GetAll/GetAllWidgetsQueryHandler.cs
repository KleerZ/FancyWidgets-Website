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
        CancellationToken cancellationToken) => await _supabaseService.FetchDataFromDb<Widget>();
}