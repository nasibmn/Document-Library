using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DocumentLibrary.Migrations
{
    public partial class document : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DateEntered = table.Column<DateTime>(nullable: true),
                    DocumentName = table.Column<string>(nullable: true),
                    NoOfDownload = table.Column<int>(nullable: false),
                    DocType = table.Column<string>(nullable: true),
                    DocUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Documents");
        }
    }
}
