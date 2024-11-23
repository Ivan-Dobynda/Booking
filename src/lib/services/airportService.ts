export const fetchAirports = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/airport?query=${query}`
  );
  const data = await res.json();

  return data;
};
