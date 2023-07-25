using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Updates.GetAllApplicationUpdates;

public class GetAllApplicationUpdatesQueryHandler
    : IRequestHandler<GetAllApplicationUpdatesQuery, IEnumerable<WhatsNew>>
{
    private readonly ISupabaseService _supabaseService;

    public GetAllApplicationUpdatesQueryHandler(ISupabaseService supabaseService)
    {
        _supabaseService = supabaseService;
    }

    public async Task<IEnumerable<WhatsNew>> Handle(GetAllApplicationUpdatesQuery request,
        CancellationToken cancellationToken)
    {
        var updates = await _supabaseService
            .FetchDataFromDb<WhatsNew>(table => table.Where(@new => @new.WidgetId == null));

        return updates.OrderByDescending(@new => @new.Date);
    }
}