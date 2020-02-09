const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.js");

//Load env vars
dotenv.config({ path: "./config/config.env" });
//Connect to the DB
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");
const app = express();

//Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

//Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close erver
  server.close(() => process.exit(1));
});
