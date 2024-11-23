export const fetchSeatMap = async (offerId: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/booking/seat_map/${offerId}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};
