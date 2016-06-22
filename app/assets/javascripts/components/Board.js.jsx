class Board extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
      return(
        <div>
          <div className="col s12 m6">
            <div className="card blue-grey lighten-3">
              <div className="card-content white-text" onClick={() => this.props.showBoard(this.props)}>
                <span className="card-title">{this.props.name}</span>
                <p>{this.props.description}</p>
              </div>
              <div className="card-action">
                <button className="btn card-btn" onClick="">Edit</button>
                <button className="btn pink card-btn" onClick={() => this.props.deleteBoard(this.props.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
}