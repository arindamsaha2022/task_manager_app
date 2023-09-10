import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
import methodOverride from"method-override";

// ...

// Use method-override middleware to handle HTTP method override
app.use(methodOverride("_method"));

// ...

let tasks = [
  {
    id: 1,
    title: "cup of coffee",
    content: "make a cup of coffee and make some brake first",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "start code",
    content: "complite the project and talk woith the client for the company ",

    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "sleep",
    content:
      "sleep with ato take the rest afforded by a suspension of voluntary bodily functions and the natural",

    date: "2023-08-10T09:15:00Z",
  },
];

let doing =[
  {
    id: 1,
    title: "data base work",
    content: "take all the parameters and manage the data base properly",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "learning frame work",
    content: "pratice previous learnings thinking about the project ",
    date: "2023-08-01T10:00:00Z",
  },
];
let done =[
  {
    id: 1,
    title: "pay bill",
    content: "things are done perfectly",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "recive the new car",
    content: "recive the car from london safely ",
    date: "2023-08-01T10:00:00Z",
  },
]

let donelastId = 2;
let lastId = 3;
let doinglastId = 2;

// GET all todo
app.get("/tasks", (req, res) => {
  // console.log(tasks);
  res.json(tasks);
});
//get all doing
app.get("/doing", (req, res) => {
  // console.log(tasks);
  res.json(doing);
});
//get all done
app.get("/done", (req, res) => {
  // console.log(done);
  res.json(done);
});

//get the spacific tasks
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((p) => p.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "Post not found" });
  res.json(task);
});
//get the spacific doing
app.get("/doing/:id", (req, res) => {
  const task = doing.find((p) => p.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "Post not found" });
  res.json(task);
});
//get the spacific done
app.get("/done/:id", (req, res) => {
  const task = done.find((p) => p.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "post not found" });
  res.json(task);
});

// POST a new todo
app.post("/tasks", (req, res) => {
  const newId = (lastId += 1);
  const { title, content } = req.body; // Destructure title and content from the request body

  const task = {
    id: newId,
    title: title,
    content: content,
    date: new Date().toISOString(),
  };
  lastId = newId;
  tasks.push(task);
  res.status(201).json(task);
});
//post new doing
app.post("/doing", (req, res) => {
  const doingnewId = (doinglastId += 1);
  const { title, content } = req.body; 

  const task = {
    id: doingnewId,
    title: title,
    content: content,
    date: new Date().toISOString(),
  };
  doinglastId = doingnewId;
  doing.push(task);
  res.status(201).json(task);
});
//post new done
app.post("/done", (req, res) => {
  const donenewId = (donelastId += 1);
  const { title, content } = req.body; 

  const task = {
    id: donenewId,
    title: title,
    content: content,
    date: new Date().toISOString(),
  };
  donelastId = donenewId;
  done.push(task);
  res.status(201).json(task);
});

// PATCH a task when you just want to update one parameter
app.patch("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((p) => p.id === taskId);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (req.body.title) task.title = req.body.title;
  if (req.body.content) task.content = req.body.content;

  res.json(task);
});

// PATCH a doing when you just want to update one parameter
app.patch("/doing/:id", (req, res) => {
  const doingId = parseInt(req.params.id);
  const task = doing.find((p) => p.id === doingId);

  if (!task) return res.status(404).json({ message: "Doing not found" });

  if (req.body.title) task.title = req.body.title;
  if (req.body.content) task.content = req.body.content;

  res.json(task);
});
// PATCH a done when you just want to update one parameter
app.patch("/done/:id", (req, res) => {
  const doneId = parseInt(req.params.id);
  const task = done.find((p) => p.id === doneId);

  if (!task) return res.status(404).json({ message: "dones not found" });

  if (req.body.title) task.title = req.body.title;
  if (req.body.content) task.content = req.body.content;

  res.json(task);
});


// DELETE a specific tasks by providing the post id
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "task not found" });
  tasks.splice(index, 1);
  res.json({ message: "task deleted" });

 });

// DELETE a specific doing by providing the post id
app.delete("/doing/:id", (req, res) => {
  const index = doing.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "doing not found" });
  doing.splice(index, 1);
  res.json({ message: "doing deleted" });

 });
// DELETE a specific done by providing the post id
app.delete("/done/:id", (req, res) => {
  const index = done.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "doing not found" });
  done.splice(index, 1);
  res.json({ message: "doing deleted" });

 });

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
