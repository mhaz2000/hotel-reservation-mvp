using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelReservationMVP.Server.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class transactionmodified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "LocalId",
                table: "Transactions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Transactions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocalId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Transactions");
        }
    }
}
