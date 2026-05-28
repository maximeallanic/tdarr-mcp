import type { TdarrToolDef } from "./tools.js";

export const TOOLS_USERS: TdarrToolDef[] = [
  {
    name: "tdarr_admin_register",
    description: "Admin register a new user",
    method: "POST",
    path: "/api/v2/admin/register",
    dataWrapped: false,
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "Username to register" },
        roles: { type: "array", items: { type: "string" }, description: "User roles" },
      },
      required: ["username", "roles"],
    },
  },
  {
    name: "tdarr_admin_reset_password",
    description: "Admin reset a user password",
    method: "POST",
    path: "/api/v2/admin/reset-password",
    dataWrapped: false,
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "Username to reset" },
      },
      required: ["username"],
    },
  },
  {
    name: "tdarr_auth_logout",
    description: "Log out the current user",
    method: "POST",
    path: "/api/v2/auth/logout",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "tdarr_auth_reset_password",
    description: "Reset current user password",
    method: "POST",
    path: "/api/v2/auth/reset-password",
    dataWrapped: false,
    inputSchema: {
      type: "object",
      properties: {
        oldPassword: { type: "string", description: "Current password" },
        password: { type: "string", description: "New password" },
      },
      required: ["oldPassword", "password"],
    },
  },
  {
    name: "tdarr_auth_verify_token",
    description: "Verify a user token",
    method: "GET",
    path: "/api/v2/auth/verify-token",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "tdarr_public_auth_login",
    description: "Log in a user",
    method: "POST",
    path: "/api/v2/public/auth/login",
    dataWrapped: false,
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "Username" },
        password: { type: "string", description: "Password" },
      },
      required: ["username", "password"],
    },
  },
  {
    name: "tdarr_public_auth_register",
    description: "Register a new user",
    method: "POST",
    path: "/api/v2/public/auth/register",
    dataWrapped: false,
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "Username" },
        password: { type: "string", description: "Password" },
      },
      required: ["username", "password"],
    },
  },
];
