class Boards extends React.Component {
  constructor(props) {
      super(props);
      this.state = { boards: props.boards, show: false };
      this.updateBoard = this.updateBoard.bind(this);
      this.deleteBoard = this.deleteBoard.bind(this);
      this.showBoard = this.showBoard.bind(this);
      this.boardBack = this.boardBack.bind(this);
  }

  updateBoard(id, board) {
    $.ajax({
      url: `/boards/${id}`,
      type: 'PUT',
      data: { board: {...board} },
      dataType: 'JSON'
    }).done( board => {
      let boards = this.state.boards;
      let editBoard = boards.find( b => b.id === board.id );
      editBoard.name = board.name;
      editBoard.description = board.description;
      this.setState({ boards: boards });
    }).fail( response => {
      alert(response.errors.toString());
    });
  }

  showBoard(board) {
    this.setState({ show: true, board });
  }

  addBoard(board) {
    this.setState({ boards: [{...board}, ...this.state.boards] })
  }

  deleteBoard(id) {
    $.ajax({
      url: `/boards/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( data => {
      let boards = this.state.boards
      let index = boards.findIndex( b => b.id === id);
      this.setState({
        boards: [
          ...boards.slice(0, index),
          ...boards.slice(index + 1, boards.length)
        ]
      })
    }).fail( data => {
      alert('Board did not delete');
    });
  }

  boardBack() {
    this.setState({ show: false });
  }

  render() {
    
    let board = this.state.board;

    if(this.state.show){
      return(
        <div>
          <h3>{this.state.board.name}</h3>
          <i>{this.state.board.description}</i>
          <br />
          <br />          
          <button className="btn" onClick={this.boardBack}>Back</button>
          <hr />
          <Lists boardId={this.state.board.id} />
        </div>
      )
    } else {
      let boards = this.state.boards.map( board => {
        return(<Board key={`board-${board.id}`} {...board} deleteBoard={this.deleteBoard} showBoard={this.showBoard} updateBoard={this.updateBoard} />)
      });

      return(
        <div>
          <NewBoard addBoard={this.addBoard.bind(this)}/>
          <br />
          <div className="row">
            {boards}
          </div>
        </div>
      )
    }
  }
}