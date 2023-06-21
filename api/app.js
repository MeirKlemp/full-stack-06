import express from "express";
import cors from "cors";
import Response from "./util/response.js";
import HttpStatus from "./util/http-status.js";
import database from "./config/mysql.config.js";
import apikeyRoutes from "./route/apikey.route.js";
import userRoutes from "./route/user.route.js";
import postRoutes from "./route/post.route.js";
import commentRoutes from "./route/comment.route.js";
import todoRoutes from "./route/todo.route.js";
import albumRoutes from "./route/album.route.js";
import photoRoutes from "./route/photo.route.js";

const PORT = process.env.PORT || 2999;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/apikeys", apikeyRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/todos", todoRoutes);
app.use("/albums", albumRoutes);
app.use("/photos", photoRoutes);

app.get("/", (req, res) =>
  database.query("SELECT * FROM Passwords", function (err, results) {
    if (err) {
      throw err;
    }
    res.send(
      new Response(
        HttpStatus.OK.code,
        HttpStatus.OK.status,
        "Patient API, v1.0.0 - All Systems Go",
        results
      )
    );
  })
);

app.all("*", (req, res) => {
  return res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        "Route does not exist on the server"
      )
    );
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
