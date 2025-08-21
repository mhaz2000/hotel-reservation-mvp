using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelReservationMVP.Server.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class hoteldataisadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HotelAddress",
                table: "Reservations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HotelGrade",
                table: "Reservations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HotelImage",
                table: "Reservations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HotelAddress",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "HotelGrade",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "HotelImage",
                table: "Reservations");
        }
    }
}
