// fix any
export const fetchOffers = async (params: any) => {
  const body = structuredClone(params);
  const slices = JSON.parse(body?.slices);

  body.slices = slices.map((slice: any) => ({
    ...slice,
    origin: slice.origin?.iata,
    destination: slice.destination?.iata,
  }));
  body.ages = body.ages ? body.ages.split(",") : [];

  if (body.return_date) {
    const slice = body.slices[0];
    body.slices.splice(1, 0, {
      departure_date: body.return_date,
      destination: slice.origin,
      origin: slice.destination,
    });
    delete body.return_date;
  }
  delete body.flight_type;
  if (body.max_connections) body.max_connections = +body.max_connections;
  if (+body.infant_without_seat)
    body.infant_without_seat = +body.infant_without_seat;

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/flight`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const fetchOffer = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flight/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const data = await res.json();

  return data;
};
