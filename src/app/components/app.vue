<template>
  <div class>
    <nav class="navbar navbar-light bg-light">
      <a href="#" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="addTask">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="task.title"
                    placeholder="Insert a task"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    placeholder="Insert a description"
                    v-model="task.description"
                    class="form-control"
                  ></textarea>
                </div>
                <button class="btn btn-primary btn-block">Send</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task) of tasks" v-bind:key="task.title">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                  <button @click="editTask(task._id)" class="btn btn-secondary">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(title, description) {
    (this.title = ""), (this.description = "");
  }
}
export default {
  data() {
    return {
      task: new Task(),
      tasks: []
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    addTask() {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.task),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
        });
      this.task = new Task();
    },
    getTasks() {
      fetch("/api/tasks")
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
          console.log(this.tasks);
        });
    },
    deleteTask(id) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.getTasks();
        });
    },
    editTask(id) {
      fetch("/api/tasks/" + id)
        .then(res => res.json)
        .then(data => {
            console.log(data.title)
          this.task = new Task(data.title, data.description);
          console.log(this.task)
        });
    }
  }
};
</script>