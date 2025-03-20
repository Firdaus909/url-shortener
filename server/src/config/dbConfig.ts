import mongoose from 'mongoose';

const connectDb = async () => {
  const MONGO_URI = `${process.env.MONGODB_URI}`;

  try {
    const connect = await mongoose.connect(`${MONGO_URI}`);
    const db = console.log(
      'Database connected:',
      connect.connection.name,
      connect.connection.host
    );
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDb;
