import app from "./app";
import dotenv from "dotenv";

// Load environment variables set .production.env for production
dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
