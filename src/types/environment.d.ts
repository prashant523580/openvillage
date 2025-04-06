
namespace NodeJS{
    interface ProcessEnv extends  ProcessEnv{
      
        JWT_SECRET: string,
        AUTH_URL: string,
        AUTH_SECRET:string,
        AES_SECRET: string,
        NEXT_PUBLIC_API:string
        NEXT_PUBLIC_URL: string
        DATABASE_URL: string
        AUTH_GOOGLE_CLIENT_ID:string
        AUTH_GOOGLE_CLIENT_SECRET:string
        GOOGLE_AUTH_EMAIL: string
        GOOGLE_AUTH_PASS : string
    }
}