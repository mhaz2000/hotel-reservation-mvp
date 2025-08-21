using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelReservationMVP.Server.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class roomadditionaldataadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoomName",
                table: "Rooms",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "RoomPrice",
                table: "Rooms",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "HotelName",
                table: "Reservations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<ulong>(
                name: "PaymentExpireSeconds",
                table: "Reservations",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<ulong>(
                name: "ReserveId",
                table: "Reservations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0ul);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoomName",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RoomPrice",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "HotelName",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "PaymentExpireSeconds",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "ReserveId",
                table: "Reservations");
        }
    }
}
