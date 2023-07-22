using FancyWidgets.Domain;
using MediatR;

namespace FancyWidgets.Application.CQs.Updates.GetRange;

public class GetUpdatesRangeQuery : IRequest<IEnumerable<WhatsNew>>
{
    internal int From { get; set; }
    internal int To { get; set; }

    public GetUpdatesRangeQuery(int from, int to)
    {
        To = to;
        From = from;
    }
}