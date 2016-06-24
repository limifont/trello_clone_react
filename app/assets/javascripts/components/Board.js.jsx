class Board extends React.Component {
  constructor(props) {
      super(props);
      this.state = { edit: false }
      this.toggleEdit = this.toggleEdit.bind(this);
      this.updateBoard = this.updateBoard.bind(this);
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  updateBoard() {
    let board = { name: this.refs.name.value, description: this.refs.description.value }
    this.toggleEdit();
    this.props.updateBoard(this.props.id, board);
  }

  edit() {
    return(
      <div>
        <div className="col s12 m6">
          <div className="card blue-grey lighten-3">
            <div className="card-content white-text">
              <span className="card-title">
                <input placeholder={this.props.name} defaultValue={this.props.name} ref="name" required autofocus />
              </span>
              <p>
                <input placeholder={this.props.description} defaultValue={this.props.description} ref="description" />
              </p>
            </div>
            <div className="card-action">
              <button className="btn card-btn blue" onClick={this.toggleEdit}>Cancel</button>
              <button className="btn pink card-btn" onClick={this.updateBoard}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  show() {
    return(
      <div>
        <div className="col s12 m6">
          <div className="card blue-grey lighten-3">
            <div className="card-content white-text" onClick={() => this.props.showBoard(this.props)}>
              <span className="card-title">{this.props.name}</span>
              <p>{this.props.description}</p>
            </div>
            <div className="card-action">
              <button className="btn card-btn" onClick={this.toggleEdit}>Edit</button>
              <button className="btn pink card-btn" onClick={() => this.props.deleteBoard(this.props.id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    ) 
  }

  render() {
    if (this.state.edit){
      return this.edit();
    } else {
      return this.show();
    }
  }
}