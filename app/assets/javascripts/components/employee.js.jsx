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

  // handleNameChange(e) {
  //   var newEmployee = this.state.employee
  //   newEmployee.name = e.target.value
  //   this.setState({employee: newEmployee});
  // },
  //
  // handleEmailChange(e) {
  //   var newEmployee = this.state.employee
  //   newEmployee.email = e.target.value
  //   this.setState({employee: newEmployee});
  // },
  //
  // handleManagerChange(e) {
  //   var newEmployee = this.state.employee
  //   newEmployee.manager = e.target.value
  //   this.setState({employee: newEmployee});
  // },
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
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        employee: that.state.employee,
      },
      url: '/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          employee: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },

  handleEmployeeFire() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.props.onFireEmployee(that.state.employee);
      }
    })
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
