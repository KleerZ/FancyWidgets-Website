using FancyWidgets.Application.Common.Interfaces;
using FancyWidgets.Domain;
using Microsoft.EntityFrameworkCore;

namespace FancyWidgets.Persistence.DbContexts;

public class FancyWidgetsDbContext : DbContext, IFancyWidgetsDbContext
{
    public DbSet<DocsArticle> DocsArticles { get; set; }
    public DbSet<DocsCategory> DocsCategories { get; set; }
    public DbSet<Widget> Widgets { get; set; }

    public FancyWidgetsDbContext(DbContextOptions<FancyWidgetsDbContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }
}