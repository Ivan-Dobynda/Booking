import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient().$extends({
    // model: {
    //   user: {
    //     async softDelete(userId: string) {
    //       const updatedUser: { deletedAt: null | Date } =
    //         await prisma.user.update({
    //           where: {
    //             id: userId,
    //           },
    //           data: {
    //             deletedAt: new Date(),
    //           },
    //           select: {
    //             deletedAt: true,
    //           },
    //         });

    //       return updatedUser;
    //     },
    //   },
    // },
    query: {
      async $allOperations({ model, operation, args, query }) {
        if (model == "User") {
          if (operation == "create") {
            args.data.deletedAt = null;
          }
          if (operation == "delete") {
            const updatedUser: { deletedAt: null | Date } =
              await prisma.user.update({
                ...args,
                data: {
                  deletedAt: new Date(),
                },
                select: {
                  deletedAt: true,
                },
              });

            return updatedUser;
          }
          if (operation == "deleteMany") {
            try {
              const updatedUsers = await prisma.user.updateMany({
                ...args,
                data: {
                  deletedAt: new Date(),
                },
              });

              return true;
            } catch (err) {
              return false;
            }
          }
        }
        return query(args);
      },
    },
  });

  return prisma;
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
