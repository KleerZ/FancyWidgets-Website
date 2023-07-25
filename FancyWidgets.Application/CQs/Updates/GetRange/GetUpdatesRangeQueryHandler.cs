using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;
using Postgrest;

namespace FancyWidgets.Application.CQs.Updates.GetRange;

public class GetUpdatesRangeQueryHandler : IRequestHandler<GetUpdatesRangeQuery, IEnumerable<WhatsNew>>
{
    private readonly ISupabaseService _supabaseService;

    public GetUpdatesRangeQueryHandler(ISupabaseService supabaseService)
    {
        _supabaseService = supabaseService;
    }

    public async Task<IEnumerable<WhatsNew>> Handle(GetUpdatesRangeQuery request, CancellationToken cancellationToken)
    {
        var results = request.Category switch
        {
            "widgets" => await _supabaseService
                .FetchDataFromDb<WhatsNew>(table => table
                    .Where(@new => @new.WidgetId != null)
                    .Range(request.From, request.To)),
            "application" => await _supabaseService
                .FetchDataFromDb<WhatsNew>(table => table
                    .Where(@new => @new.WidgetId == null)
                    .Range(request.From, request.To)),
            _ => await _supabaseService
                .FetchDataFromDb<WhatsNew>(table => table
                    .Range(request.From, request.To)),
        };

        return results.OrderByDescending(@new => @new.Date);
    }
}