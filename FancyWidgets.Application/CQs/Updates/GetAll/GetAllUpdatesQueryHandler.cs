using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;
using Postgrest;

namespace FancyWidgets.Application.CQs.Updates.GetAll;

public class GetAllUpdatesQueryHandler : IRequestHandler<GetAllUpdatesQuery, IEnumerable<WhatsNew>>
{
    private readonly ISupabaseService _supabaseService;

    public GetAllUpdatesQueryHandler(ISupabaseService supabaseService)
    {
        _supabaseService = supabaseService;
    }

    public async Task<IEnumerable<WhatsNew>> Handle(GetAllUpdatesQuery request,
        CancellationToken cancellationToken)
    {
        var updates = await _supabaseService.FetchDataFromDb<WhatsNew>();
        return updates.OrderByDescending(@new => @new.Date);
    }
}