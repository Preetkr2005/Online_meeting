import mongoose from "mongoose"

const MONGO_URL = "mongodb://127.0.0.1:27017/ONLINE_MEETING"

const connectDB = main()
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

export default connectDB
