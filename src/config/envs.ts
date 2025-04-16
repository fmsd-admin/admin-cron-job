interface Envs {
    DATABASE_URL: string | undefined,
    REDIS_URL: string | undefined
}

const {
    DATABASE_URL,
    REDIS_URL
} = process.env

export const envs: Envs = {
    DATABASE_URL,
    REDIS_URL,
}