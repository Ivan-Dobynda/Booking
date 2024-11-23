export const createTraveler = async (payload: any) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/settings/travelers`, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json())
}

export const updateTraveler = async (payload: any, id: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/settings/travelers/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  }).then((res) => res.json())
}
