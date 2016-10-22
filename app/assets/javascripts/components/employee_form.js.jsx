var EmployeeForm = React.createClass({
  getInitialState() {
    return {
      name: '',
      email: '',
      manager: false
    }
  },
  render: function() {
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={this.state.name} placeholder="i.e. John Smith"/>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={this.state.email} placeholder="john@123.com"/>
      </div>
      <div className="form-group">
        <button></button>
      </div>
    </form>
  }
});
