export const updateProfile = async (payload: any) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
    method: "PUT",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const updateProfileImage = async (payload: any) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/image`, {
    method: "PUT",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};
export const updatePersonalInfo = async (payload: any) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/personal-info`, {
    method: "PUT",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const updatePassword = async (payload: any) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/password`, {
    method: "PUT",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const verifyPhoneNumber = async (payload: any) => {

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/verify-phone-number`, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const verifyOTP = async (payload: any) => {

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/verify-otp`, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

export const EnableTwoFactor = async (payload: any) => {

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/enable-two-factor-authentication`, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};