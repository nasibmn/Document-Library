using DocumentLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace DocumentLibrary.Context
{
    public class DocumentDbContext:DbContext
    {
        public DocumentDbContext(DbContextOptions<DocumentDbContext> options) : base(options)
        {

        }
        public DbSet<DocumentModel> Documents { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<DocumentModel>().ToTable("Documents");
            builder.Entity<DocumentModel>(entity =>
            {
                entity.HasKey(e => e.Id);
            });
        }
    }
}
