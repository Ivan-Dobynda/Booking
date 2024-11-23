// fix any
export const fetchHotels = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel`, {
            method: "GET",
        });
        const hotels = await res.json();
        return hotels.result;
    } catch (error) {
        console.log(error);
    }
};
export const fetchHotelDetails = async (hotelCode: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel/${hotelCode}`, {
    method: "GET"
  });
  const hotelData = await res.json();
  return hotelData.result;

};
export const hotelsAvailability = async (body: any) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel/availability`, {
        method: "POST",
        body: JSON.stringify(body),
    });
};

export const hotelBooking = async (body: any) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotel/booking`, {
        method: "POST",
        body: JSON.stringify(body),
    });
};
