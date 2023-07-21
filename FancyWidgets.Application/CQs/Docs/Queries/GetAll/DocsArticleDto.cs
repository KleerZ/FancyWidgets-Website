using AutoMapper;
using FancyWidgets.Application.Common.Mappings;
using FancyWidgets.Domain;

namespace FancyWidgets.Application.CQs.Docs.Queries.GetAll;

public class DocsArticleDto : IMapWith<DocsArticle>
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Text { get; set; } = "";
    public string RouterUrl { get; set; } = "";
    public string Category { get; set; } = "";
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<DocsArticle, DocsArticleDto>()
            .ForMember(u => u.Id,
                o
                    => o.MapFrom(u => u.Id))
            .ForMember(u => u.Title,
                o
                    => o.MapFrom(u => u.Title))
            .ForMember(u => u.Text,
                o
                    => o.MapFrom(u => u.Text))
            .ForMember(u => u.RouterUrl,
                o
                    => o.MapFrom(u => u.RouterUrl));
    }
}