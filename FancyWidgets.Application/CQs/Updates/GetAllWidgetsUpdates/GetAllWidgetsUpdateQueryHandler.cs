using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Updates.GetAllWidgetsUpdates;

public class GetAllWidgetsUpdateQueryHandler
    : IRequestHandler<GetAllWidgetsUpdateQuery, IEnumerable<WhatsNew>>
{
    private readonly ISupabaseService _supabaseService;

    public GetAllWidgetsUpdateQueryHandler(ISupabaseService supabaseService)
    {
        _supabaseService = supabaseService;
    }

    public async Task<IEnumerable<WhatsNew>> Handle(GetAllWidgetsUpdateQuery request,
        CancellationToken cancellationToken)
    {
        var updates = await _supabaseService
            .FetchDataFromDb<WhatsNew>(table => table.Where(@new => @new.WidgetId != null));

        return updates.OrderByDescending(@new => @new.Date);
    }
}