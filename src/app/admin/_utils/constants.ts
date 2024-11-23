import { Role } from "@prisma/client";

// Pagination
export const HOMEPAGE_FAQ_LIMIT = 3;
export const FAQ_DEFAULT_LIMIT = 10;

// // Admin Roles
// export const ADMIN_ROLES_OPTIONS = [
//   { name: "Admin", value: "ADMIN" },
//   // { name: "Super Administrator", value: "SUPER_ADMINISTRATOR" },
//   // { name: "Client Admin", value: "CLIENT_ADMIN" },
//   // { name: "Accounts Admin", value: "ACCOUNTS_ADMIN" },
//   // { name: "Clients Accounts Admin", value: "CLIENTS_ACCOUNTS_ADMIN" },
//   // { name: "Content Moderator", value: "CONTENT_MODERATOR" },
//   // { name: "Customer Support", value: "CUSTOMER_SUPPORT" },
//   // { name: "Client Customer Support", value: "CLIENT_CUSTOMER_SUPPORT" },
//   // { name: "Client Content Moderator", value: "CLIENT_CONTENT_MODERATOR" },
// ];

export const ADMIN_ROLES: Role[] = [
  "SUPER_ADMINISTRATOR",
  "ADMIN",
  "ACCOUNTS_ADMIN",
  "CLIENT_TRAVELER",
  "CLIENT_AGENCY",
  "CONTENT_MODERATOR",
  "CUSTOMER_SUPPORT",
];

export const ADMIN_ROLES_OPTIONS = ADMIN_ROLES.map((role) => ({
  value: role,
  name: role
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase()),
}));

// App Roles
export const APP_ROLES_OPTIONS = [
  { name: "Candidate", value: "CANDIDATE" },
  { name: "Employer", value: "EMPLOYER" },
];
