import Tasks from "../models/tasks.js";

export async function addTask(req, res) {
    console.log(req.body);
  console.log(req.user);
  if (req.user.isAdmin) {
    try {
      const taskData = {
        created_by: req.user.email,
        assigned_to: req.body.assigned_to,
        status: req.body.status,
        priority: req.body.priority,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        description: req.body.description,
        title: req.body.title,
        subtasks: req.body.subtasks,
      };

      const task = new Tasks(taskData);
      await task.save();

      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  if (req.user.isPersonal) {
    try {
      const taskData = {
        created_by: req.user.email,
        assigned_to: req.user.email,
        status: req.body.status,
        priority: req.body.priority,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        description: req.body.description,
        title: req.body.title,
        subtasks: req.body.subtasks,
      };

      const task = new Tasks(taskData);
      await task.save();

      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export async function getTasks(req, res) {
  console.log(req.user);
  if(req.user.isAdmin){
    try {
      const tasks = await Tasks.find(({ companyName: req.user.companyName }));
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  if(req.user.isPersonal){
    if(req.user.companyName === "Personal"){
      try {
        const tasks = await Tasks.find(({ assigned_to: req.user.email }));
        res.status(200).json(tasks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    }
  }

  try {
    const tasks = await Tasks.find({ assigned_to: req.user.email }, { companyName: req.user.companyName });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const updatedTask = await Tasks.findByIdAndUpdate(taskId, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    await Tasks.findByIdAndDelete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
