using System.Text.Json;
using System.Text.Json.Serialization;

namespace HotelReservationMVP.Server.Application.Converters;

public class BoolFromZeroOneConverter : JsonConverter<bool>
{
    public override bool Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        switch (reader.TokenType)
        {
            case JsonTokenType.Number:
                return reader.GetInt32() == 0 ? true : false; // 0 = true, 1 = false
            case JsonTokenType.String:
                var str = reader.GetString();
                return str == "0";
            default:
                throw new JsonException("Cannot convert value to bool");
        }
    }

    public override void Write(Utf8JsonWriter writer, bool value, JsonSerializerOptions options)
    {
        writer.WriteNumberValue(value ? 0 : 1);
    }
}