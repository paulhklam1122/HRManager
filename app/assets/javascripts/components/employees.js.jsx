var Employees = React.createClass({
  getInitialState() {
    return {
      employees: this.props.employees,
      employee: {
        name: '',
        email: '',
        manager: false
      },
      errors: {}
    }
  },
  handleInputChange(e) {
    console.log(e.target.value)
    var newEmployee = this.state.employee
    newEmployee[e.target.name] = e.target.value
    this.setState({employee: newEmployee})
  },
  handleHireEmployee() {
    // var that = this;
    $.ajax({
      method: 'POST',
      data: {
        employee: this.state.employee,
      },
      url: '/employees.json',
      success: function(res) {
        var newEmployeeList = this.state.employees;
        newEmployeeList.push(res);
        this.setState({
          employees: newEmployeeList,
          employee: {
            name: '',
            email: '',
            manager: false
          },
          errors: {}
        });
      }.bind(this),
      error: function(res) {
        this.setState({errors: res.responseJSON.errors})
      }.bind(this)
    });
  },

  handleFireEmployee(employee) {
    var employeeList = this.state.employees.filter(function(item) {
      return employee.id !== item.id;
    });
    this.setState({employees: employeeList});
  },

  render() {
    // var that = this;
    var employees = this.state.employees.map( function(employee) {
      return (
        <Employee employee={employee} key={employee.id} onFireEmployee={this.handleFireEmployee} />
      );
    }.bind(this));
    return (
      <div className="container">
        <h1>Employees</h1>
        <div id="employees">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Manager</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees}
              <tr>
                <td>
                  <input type="text" value={this.state.employee.name} onChange={this.handleInputChange} name="name" /><br />
                  <span style={{color: 'red'}}>{this.state.errors.name}</span>
                </td>
                <td>
                  <input value={this.state.employee.email} type="text" onChange={this.handleInputChange} name="email" /><br />
                  <span style={{color: 'red'}}>{this.state.errors.email}</span>
                </td>
                <td><input value={this.state.employee.manager} type="checkbox" onChange={this.handleInputChange} name="manager" /></td>
                <td><button onClick={this.handleHireEmployee} className="btn btn-success">Hire</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
