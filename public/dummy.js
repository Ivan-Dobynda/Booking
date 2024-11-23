const x = {
    "slices": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "origin": {
                    "type": "string",
                    "description": "Airport code for the origin"
                },
                "destination": {
                    "type": "string",
                    "description": "Airport code for the destination"
                },
                "departure_date": {
                    "type": "string",
                    "format": "date",
                    "description": "Departure date in YYYY-MM-DD format"
                }
            }
        }
    }
};