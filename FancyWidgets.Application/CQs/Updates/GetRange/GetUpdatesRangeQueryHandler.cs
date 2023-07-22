using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;

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
        var results = await _supabaseService
            .FetchDataFromDb<WhatsNew>(table => table.Range(request.From, request.To));

        return results;
    }
}