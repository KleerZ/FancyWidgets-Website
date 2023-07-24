using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;
using Postgrest;

namespace FancyWidgets.Application.CQs.Updates.GetByWidgetId;

public class GetUpdatesByWidgetIdQueryHandler
    : IRequestHandler<GetUpdatesByWidgetIdQuery, IEnumerable<WhatsNew>>
{
    private readonly ISupabaseService _supabaseService;

    public GetUpdatesByWidgetIdQueryHandler(ISupabaseService supabaseService)
    {
        _supabaseService = supabaseService;
    }

    public async Task<IEnumerable<WhatsNew>> Handle(GetUpdatesByWidgetIdQuery request,
        CancellationToken cancellationToken)
    {
        var updates = await _supabaseService
            .FetchDataFromDb<WhatsNew>(table => table.Where(@new => @new.WidgetId == request.Id));

        return updates.OrderByDescending(@new => @new.Date);
    }
}