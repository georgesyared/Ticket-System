const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const { errorHandler } = require("../backend/middleware/errorMiddleware");

const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;

//Connected To Database
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/tickets", require("./Routes/ticketRoutes"));

//Serve Front End
if (process.env.NODE_ENV === "production") {
  //set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome To The Support Desk Api" });
  });
}

app.use(errorHandler);

//Listener
app.listen(PORT, () => {
  console.log(`Server Started On Port ${PORT}`);
});
