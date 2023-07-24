using FancyWidgets.Application.Common.SupabaseDb;
using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Widgets.GetById;

public class GetWidgetByIdQueryHandler : IRequestHandler<GetWidgetByIdQuery, Widget?>
{
    private readonly ISupabaseService _supabaseService;

    public GetWidgetByIdQueryHandler(ISupabaseService supabaseService)
    {
        _supabaseService = supabaseService;
    }

    public async Task<Widget?> Handle(GetWidgetByIdQuery request, CancellationToken cancellationToken)
    {
        var widget = await _supabaseService
            .FetchDataFromDb<Widget>(table => table.Where(widget => widget.Id == request.Id));

        return widget.FirstOrDefault();
    }
}