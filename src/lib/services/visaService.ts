export const fetchVisaRequirements = async (from?: string, to?: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/visa/?from=${from}&to=${to}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};
