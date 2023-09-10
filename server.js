import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { render } from "ejs";
import methodOverride from"method-override";
const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ...

// Use method-override middleware to handle HTTP method override
app.use(methodOverride("_method"));

// ...


// Render index.ejs for tasks and doing
app.get("/", async (req, res) => {
  try {
    const tasksResponse = await axios.get(`${API_URL}/tasks`);
    const doingResponse = await axios.get(`${API_URL}/doing`);
    const doneResponse = await axios.get(`${API_URL}/done`);
    
    res.render("index.ejs", { todos: tasksResponse.data, doing: doingResponse.data, done: doneResponse.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks and doing tasks" });
  }
});



//render the edit page
app.get("/new", (req, res) => {
  res.render("edit.ejs", { heading: "new todo", submit: "Add" });
});
//render doing
app.get("/doing", (req, res) => {
  res.render("doing.ejs", { heading: "new done", submit: "Add" });
});
app.get("/done", (req, res) => {
  res.render("done.ejs", { heading: "new done", submit: "Add" });
});

//creat new task
app.post("/api/tasks", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

//creat new doing
app.post("/api/doing", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/doing`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});
//creat new done
app.post("/api/done", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/done`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

//render the edit.ejs file 
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${req.params.id}`);
    // console.log(response.data);
    res.render("edit.ejs", {
      heading: "Edit task",
      submit: "Update taks",
      task: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
});
//render the doing file 
app.get("/doing/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/doing/${req.params.id}`);
    // console.log(response.data);
    res.render("doing.ejs", {
      heading: "Edit doing",
      submit: "Update doing",
      doing: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doings" });
  }
});
//render the done file 
app.get("/done/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/done/${req.params.id}`);
    // console.log(response.data);
    res.render("done.ejs", {
      heading: "Edit done",
      submit: "Update done",
      done: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doings" });
  }
});


// Update a task using the PATCH method
app.post("/api/tasks/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/tasks/${req.params.id}`,
      req.body
    );
    console.log(response);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
});




//make patch requst for update the doing
app.post("/api/doing/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/doing/${req.params.id}`,
      req.body
    );
    console.log(response);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error update done " });
  }
});
//make patch requst for update the doing
app.post("/api/done/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/done/${req.params.id}`,
      req.body
    );
    console.log(response);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error update doing " });
  }
});

//delete by the spacific id
app.get("/api/tasks/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/tasks/${req.params.id}`);
    res.redirect("/");
    console.log("deleted");
  } catch (error) {
    res.status(500).json({ message: "nodt able to delete the task" });
  }
});
//delete doing by the spacific id
app.get("/api/doing/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/doing/${req.params.id}`);
    res.redirect("/");
    console.log("deleted");
  } catch (error) {
    res.status(500).json({ message: "nodt able to delete the task" });
  }
});
//delete done by the spacific id
app.get("/api/done/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/done/${req.params.id}`);
    res.redirect("/");
    console.log("deleted");
  } catch (error) {
    res.status(500).json({ message: "not able to delete the task" });
  }
});
app.listen(port, () => {
  console.log(`Port no:${port} is running`);
});
