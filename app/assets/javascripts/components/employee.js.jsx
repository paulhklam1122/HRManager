var Employee = React.createClass({
  getInitialState() {
    return {
      employee: this.props.employee,
      editMode: false,
      errors: {}
    }
  },
  setEditMode() {
    this.setState({editMode: true});
  },
  handleInputChange(e) {
    var updateEmployee = this.state.employee
    updateEmployee[e.target.name] = e.target.value
    this.setState({employee: updateEmployee})
  },
  toggleManagerStatus: function () {
    var updateEmployee = this.state.employee
    updateEmployee.manager = !this.state.employee.manager
    this.handleEmployeeUpdate();
  },
  handleEmployeeUpdate() {
    // var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        employee: this.state.employee,
      },
      url: '/employees/' + this.state.employee.id + '.json',
      success: function(res) {
        this.setState({
          errors: {},
          employee: res,
          editMode: false
        });
      }.bind(this),
      error: function(res) {
        this.setState({errors: res.responseJSON.errors});
      }.bind(this)
    });
  },

  handleEmployeeFire() {
    // var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/employees/' + this.state.employee.id + '.json',
      success: function(res) {
        this.props.onFireEmployee(this.state.employee);
      }.bind(this)
    });
  },

  render() {
    if ( this.state.editMode ) {
      markup = (
        <tr>
          <td>
            <input
              type="text"
              value={this.state.employee.name}
              onChange={this.handleInputChange} name="name" />
            <span style={{color: 'red'}}>{this.state.errors.name}</span>
          </td>
          <td>
            <input
              type="text"
              value={this.state.employee.email}
              onChange={this.handleInputChange} name="email" />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.email}</span>
          </td>
          <td>
            <input
              type="checkbox"
              value={this.state.employee.manager}
              onChange={this.handleInputChange} name="manager" />
          </td>
          <td>
            <button onClick={this.handleEmployeeUpdate} className="btn btn-primary">Save</button>
          </td>
        </tr>
      );
    } else {
      markup = (
        <tr>
          <td>{this.state.employee.name}</td>
          <td>{this.state.employee.email}</td>
          <td>{this.state.employee.manager ? '✔' : ''}</td>
          <td>
            <button onClick={this.setEditMode} className="btn btn-primary">Edit</button>
            <button onClick={this.toggleManagerStatus} className="btn btn-primary">{this.state.employee.manager ? 'Demote' : 'Promote'}</button>
            <button onClick={this.handleEmployeeFire} style={{color: 'red'}} className="btn btn-primary">Fire</button>
          </td>
        </tr>
      );
    }
    return markup;
  }
});
