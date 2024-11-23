import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const checkIsUserVerified = async (params: { token: string }) => {
  const { token } = params;

  const tokenRecord = await prisma.activateToken.findFirst({
    where: {
      token,
      createdAt: {
        gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      },
    },
  });

  if (!tokenRecord) {
    return "Token is invalid or expired";
  }

  await prisma.user.update({
    where: {
      id: tokenRecord.userId,
    },
    data: {
      emailVerifiedAt: new Date(),
    },
  });

  await prisma.activateToken.deleteMany({
    where: {
      userId: tokenRecord.userId,
    },
  });

  redirect("/login");
};

export default async function ActivateAccount({
  params,
}: {
  params: { token: string };
}) {
  const response = await checkIsUserVerified(params);

  return (
    <section>
      <p>{response}</p>
    </section>
  );
}
