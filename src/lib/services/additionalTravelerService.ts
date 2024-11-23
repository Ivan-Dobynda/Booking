export const updateAdditionalTraveller = async (payload: any) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/additional-traveler`, {
        method: "PUT",
        body: JSON.stringify(payload),
    }).then((res) => res.json());
};
