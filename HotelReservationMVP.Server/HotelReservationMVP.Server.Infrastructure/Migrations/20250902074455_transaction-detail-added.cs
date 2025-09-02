using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelReservationMVP.Server.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class transactiondetailadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TransactionDetailId",
                table: "Transactions",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "TransactionDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CardNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Rrn = table.Column<string>(type: "TEXT", nullable: true),
                    RefId = table.Column<string>(type: "TEXT", nullable: true),
                    Amount = table.Column<decimal>(type: "TEXT", nullable: true),
                    PayGateTranID = table.Column<long>(type: "INTEGER", nullable: true),
                    ResCode = table.Column<int>(type: "INTEGER", nullable: false),
                    ResMessage = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionDetails", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_TransactionDetailId",
                table: "Transactions",
                column: "TransactionDetailId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_TransactionDetails_TransactionDetailId",
                table: "Transactions",
                column: "TransactionDetailId",
                principalTable: "TransactionDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_TransactionDetails_TransactionDetailId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "TransactionDetails");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_TransactionDetailId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TransactionDetailId",
                table: "Transactions");
        }
    }
}
