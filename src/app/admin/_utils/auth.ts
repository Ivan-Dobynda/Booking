import { getSession, signIn } from "next-auth/react";

import { fetchAdminUser } from "@admin/_queries/userQueries";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) return { error: res?.error };

    if (res?.ok) {
      const session = await getSession();

      if (session?.user) {
        const user = session.user;

        return { role: user?.role };
      }
    }
  } catch (err) {
    console.log("err: ", err);

    return { error: "Error during login. Try again later." };
  }
}

export async function loginAdmin({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<
  | {
      error: string;
      role?: undefined;
    }
  | {
      role: string;
      error?: undefined;
    }
  | undefined
> {
  const user = await fetchAdminUser({ email });

  if (!user?.id) {
    return { error: "Username or Password Incorrect" };
  }

  return loginUser({ email, password });
}
