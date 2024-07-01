using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace D1Tech_Backend.Migrations
{
    public partial class mig_7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TravelPlaceAddresses_TravelPlaces_TravelPlaceId",
                table: "TravelPlaceAddresses");

            migrationBuilder.AlterColumn<Guid>(
                name: "TravelPlaceId",
                table: "TravelPlaceAddresses",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "TravelPlaceAddresses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_TravelPlaceAddresses_TravelPlaces_TravelPlaceId",
                table: "TravelPlaceAddresses",
                column: "TravelPlaceId",
                principalTable: "TravelPlaces",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TravelPlaceAddresses_TravelPlaces_TravelPlaceId",
                table: "TravelPlaceAddresses");

            migrationBuilder.AlterColumn<Guid>(
                name: "TravelPlaceId",
                table: "TravelPlaceAddresses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "TravelPlaceAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TravelPlaceAddresses_TravelPlaces_TravelPlaceId",
                table: "TravelPlaceAddresses",
                column: "TravelPlaceId",
                principalTable: "TravelPlaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
