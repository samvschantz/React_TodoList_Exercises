import React, { Component } from "react";
import { generateRandomId } from "./utils";
import tasks from "./tasks.json";
import { toggleTask, addTask, getTasks } from "./task-svc";

class Loading extends Component {
  render() {
    return (
      <tr>
        <td colspan="2">Loading Tasks...</td>
      </tr>
    );
  }
}

// function TodoListItem({ task, toggleAllTasks }) {
//   return (
//     <tr>
//       <td>{task.taskName}</td>
//       <td>
//         <input
//           type="checkbox"
//           checked={task.finished}
//           onChange={() => {
//             toggleAllTasks(task.id);
//           }}
//         />
//       </td>
//     </tr>
//   );
// }

// function NewTaskForm({ addTaskFromForm }) {
//   const onSubmit = e => {
//     e.preventDefault();
//     const taskNameInput = e.target.elements.taskName;
//     addTaskFromForm(taskNameInput.value);
//     taskNameInput.value = "";
//   };
//   return (
//     <form onSubmit={onSubmit}>
//       <input type="text" name="taskName" placeholder="Write Task Name" />
//       <button type="submit">Add</button>
//     </form>
//   );
// }

export default class ToDoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.toggleAllTasks = this.toggleAllTasks.bind(this);
    this.addTaskFromForm = this.addTaskFromForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    getTasks().then(tasks => {
      this.setState({
        loading: false,
        tasks
      });
    });
  }

  toggleAllTasks = taskId => {
    const newTasks = toggleTask(taskId);
    this.setState({ tasks: newTasks });
  };

  addTaskFromForm(taskName) {
    const newTasks = addTask(taskName);
    this.setState({ tasks: newTasks });
  }

  onSubmit(e) {
    e.preventDefault();
    const taskNameInput = e.target.elements.taskName;
    this.addTaskFromForm(taskNameInput.value);
    taskNameInput.value = "";
  }

  render() {
    return (
      <ToDoListPresenter
        addTaskFromForm={this.addTaskFromForm}
        toggleAllTasks={this.toggleAllTasks}
        tasks={this.state.tasks}
        loading={this.state.loading}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const ToDoListPresenter = props => {
  if (props.loading) {
    return <Loading />;
  }

  const tasksArray = props.tasks;
  let taskItems = tasksArray.map(task => (
    <tr>
      <td>{task.taskName}</td>
      <td>
        <input
          type="checkbox"
          checked={task.finished}
          onClick={() => props.toggleAllTasks(task.id)}
        />
      </td>
    </tr>
  ));

  const newTaskForm = (
    <form onSubmit={props.onSubmit}>
      <input type="text" name="taskName" placeholder="Write Task Name" />
      <button type="submit">Add</button>
    </form>
  );

  return (
    <div className="container">
      <h1>
        Get It Done! <br />
        <small>For the truly industrious</small>
      </h1>

      <table>
        <thead>
          <tr>
            <td>Task</td>
            <td>Done?</td>
          </tr>
        </thead>
        <tbody>{taskItems}</tbody>
      </table>

      <hr />
      {newTaskForm}
    </div>
  );
};

// export default class TodoList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { loading: true };
//     this.toggleAllTasks = this.toggleAllTasks.bind(this);
//     this.addTaskFromForm = this.addTaskFromForm.bind(this);
//   }

//   componentDidMount() {
//     getTasks().then(tasks => {
//       this.setState({
//         loading: false,
//         tasks
//       });
//     });
//   }

//   toggleAllTasks = taskId => {
//     const newTasks = toggleTask(taskId);
//     this.setState({ tasks: newTasks });
//   };

//   addTaskFromForm(taskName) {
//     const newTasks = addTask(taskName);
//     this.setState({ tasks: newTasks });
//   }

//   render() {
//     if (this.state.loading) {
//       return <Loading />;
//     }
//     const taskItems = this.state.tasks.map(task => (
//       <TodoListItem
//         key={task.id}
//         task={task}
//         toggleAllTasks={taskId => this.toggleAllTasks(taskId)}
//       />
//     ));
//     return (
//       <div className="container">
//         <h1>
//           Get It Done! <br />
//           <small>For the truly industrious</small>
//         </h1>

//         <table>
//           <thead>
//             <tr>
//               <td>Task</td>
//               <td>Done?</td>
//             </tr>
//           </thead>
//           <tbody>{taskItems}</tbody>
//         </table>

//         <hr />
//         <NewTaskForm addTaskFromForm={this.addTaskFromForm} />
//       </div>
//     );
//   }
// }
