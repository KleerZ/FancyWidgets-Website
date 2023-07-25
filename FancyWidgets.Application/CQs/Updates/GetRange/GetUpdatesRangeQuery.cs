using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Updates.GetRange;

public class GetUpdatesRangeQuery : IRequest<IEnumerable<WhatsNew>>
{
    public int From { get; set; }
    public int To { get; set; }
    public string? Category { get; set; }

    public GetUpdatesRangeQuery(int from, int to, string? category)
    {
        To = to;
        From = from;
        Category = category;
    }
}