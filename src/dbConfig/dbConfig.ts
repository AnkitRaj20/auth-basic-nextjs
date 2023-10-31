import mongoose from "mongoose";

export async function connect() {
    try {
        // ! -> it cofirms that the uri will always be  avaiable
        mongoose.connect(process.env.MONGO_URI!);
        const connection =  mongoose.connection;



        // ============ Listening Events ===============
        connection.on('connected', () => {
            console.log("Connected successfully")
        })

        connection.on('error',(err)=>{
            console.log("connection error: ");
            console.log(err);
            process.exit()
        })
    } catch (error) {
        console.log("Something went wrong!!")
        console.log(error)
    }
}