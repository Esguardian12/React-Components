import { Component } from 'react';

// 1. The new Count class component
class Count extends Component {
    render() {
        return <p>Total tasks: {this.props.count}</p>;
    }
}

class ClassInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [], // Now stores objects: { id, val }
            inputVal: "",
            // New state properties for the edit feature
            editTaskId: null,
            editTaskVal: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleResubmit = this.handleResubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState((state) => ({
            ...state,
            inputVal: e.target.value,
        }));
    }

    handleSubmit(e) {
        e.preventDefault();
        // prevent adding empty tasks
        if(!this.state.inputVal.trim()) return;

        const newTask = {
            id: crypto.randomUUID(), //Generates a unique ID
            val: this.state.inputVal,
        };

        this.setState((state) => ({
            todos: state.todos.concat(newTask),
            inputVal: "",
        }));
    }

    // 2. Delete function
    handleDelete(id) {
        this.setState((state) =>({
            todos: state.todos.filter((todo) => todo.id !== id),
        }));
    }

    // 3. Edit functions
    handleEdit(id, currentVal) {
        this.setState({
            editTaskId: id,
            editTaskVal: currentVal,
        });
    }

    handleEditChange(e) {
        this.setState({
            editTaskVal: e.target.value,
        });
    }

    handleResubmit(e, id) {
        e.preventDefault();
        this.setState((state) => ({
            // Map through todos: if the ID matches, update its value. Otherwise, return as-is.
            todos: state.todos.ap((todo) => 
                todo.id === id ? {...todo, val: state.editTaskVal } : todo
            ),
            // Reset edit state
            editTaskVal: null,
            editTaskVal: "",
        }));
    }

    render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        
        {/* Render the Count component and pass the array length as a prop */}
        <Count count={this.state.todos.length} />

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            id="task-entry"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        
        <h4>All the tasks!</h4>
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.id}>
              {this.state.editTaskId === todo.id ? (
                /* --- EDIT MODE --- */
                <form onSubmit={(e) => this.handleResubmit(e, todo.id)} style={{ display: 'inline' }}>
                  <input
                    type="text"
                    value={this.state.editTaskVal}
                    onChange={this.handleEditChange}
                    autoFocus
                  />
                  <button type="submit">Resubmit</button>
                </form>
              ) : (
                /* --- VIEW MODE --- */
                <>
                  {todo.val}
                  <button onClick={() => this.handleEdit(todo.id, todo.val)}>Edit</button>
                  <button onClick={() => this.handleDelete(todo.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;