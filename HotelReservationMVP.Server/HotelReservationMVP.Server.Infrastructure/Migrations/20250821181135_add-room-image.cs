using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelReservationMVP.Server.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addroomimage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoomImage",
                table: "Rooms",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoomImage",
                table: "Rooms");
        }
    }
}
