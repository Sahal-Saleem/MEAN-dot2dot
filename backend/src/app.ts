import express, {Application} from "express"
import http from "http"
import cookieParser from "cookie-parser"
import expressConfig from "./Framework/server/express"
import serverConfig from "./Framework/server/server"
import connectDB from "./Framework/database/connection"

// import middlewares
import { notFound, errorHandler } from "./Middlewares/errorMiddlewares"

const app:Application = express()

const server = http.createServer(app)

// express configuration (middlewares(req,res))
expressConfig(app)

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// import routes to the server page
import userRoutes from "./Routes/userRoutes"

app.use('/api/users', userRoutes)

// use error
app.use(notFound);
app.use(errorHandler)

// configuring server and starting
serverConfig(server).startServer()

// connect database
connectDB()

export default app;