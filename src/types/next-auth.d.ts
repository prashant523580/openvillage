import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role?: "ADMIN" | "USER"
    phoneNumber?: string
  }

  interface Session {
    user: {
      id: string
      name?: string
      email?: string
      image?: string
      role?: "ADMIN" | "USER"
      phoneNumber?: string
    }
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role?: "ADMIN" | "USER"
    phoneNumber?: string
  }
}