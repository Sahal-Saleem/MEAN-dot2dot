import dotenv from "dotenv"
dotenv.config()

const configKeys ={
    PORT: process.env.PORT as string,
    ORIGIN_PORT: process.env.ORIGIN_PORT as string,
    MONGODB_URL: process.env.MONGODB_URL as string,
    JWT_SECRET:process.env.JWT_SECRET as string,
    NODE_ENV:process.env.NODE_ENV as string
}

export default configKeys