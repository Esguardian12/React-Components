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
}