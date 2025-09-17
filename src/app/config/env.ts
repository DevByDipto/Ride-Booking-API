import dotenv from "dotenv"
dotenv.config() // keno dilam ?

interface EnvConfig{
     PORT: string
    MONGO_URI: string
    NODE_ENV: string
}

const loadEnvVariable=():EnvConfig=>{ // aikhane to ami bole e dicchi j PORT: process.env.PORT as string mane port string hobe tahole abar EnvConfig korar dorkar kii?
    const requredEnvVariables : string[] = ["PORT",'MONGO_URI',"NODE_ENV"]
requredEnvVariables.forEach(key=>{
    if(!process.env[key]){
        throw new Error(`Missing require enviroment variable ${key}`)
    }
})
    return{
         PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
    NODE_ENV: process.env.NODE_ENV as string,
    }
}


export const envVars= loadEnvVariable()

