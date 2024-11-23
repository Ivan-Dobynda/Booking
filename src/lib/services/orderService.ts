export const createOrder = async (payload: any) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/order`, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};
