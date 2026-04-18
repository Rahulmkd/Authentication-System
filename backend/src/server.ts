import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./lib/prisma.js";

const PORT = process.env.PORT || 5001;

// console.log(process.env.PORT);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
