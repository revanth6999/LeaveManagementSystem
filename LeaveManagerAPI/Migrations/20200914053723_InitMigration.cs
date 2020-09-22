using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LeaveManagerAPI.Migrations
{
    public partial class InitMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LeaveRequests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(nullable: true),
                    EId = table.Column<int>(nullable: false),
                    FromDate = table.Column<string>(nullable: true),
                    ToDate = table.Column<string>(nullable: true),
                    Reason = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    ManagerId = table.Column<int>(nullable: false),
                    ApplyDateTime = table.Column<string>(nullable: true),
                    ReplyDateTime = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveRequests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TotalLeaves",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UpdateDateTime = table.Column<string>(nullable: true),
                    TotalCasualLeaves = table.Column<float>(nullable: false),
                    TotalEarnedLeaves = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TotalLeaves", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    UsedCasualLeaves = table.Column<float>(nullable: false),
                    UsedEarnedLeaves = table.Column<float>(nullable: false),
                    IsManager = table.Column<bool>(nullable: false),
                    ManagerId = table.Column<int>(nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LeaveRequests");

            migrationBuilder.DropTable(
                name: "TotalLeaves");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
