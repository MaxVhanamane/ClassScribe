import mongoose from "mongoose"
const connectDb = async () => {
    return  mongoose.connect(process.env.MONGO_URI, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("connected to mongoDB successfully");
        }
      });

}

export default connectDb
