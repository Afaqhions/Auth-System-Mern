import mongoose from "mongoose"

const mongoDbConnection = async ()=>{
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);    
  } catch (error) {
    console.log(error.message);    
  }  
};

export default mongoDbConnection