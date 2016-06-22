class Lists extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lists: [], show: false  };
    this.deleteList = this.deleteList.bind(this);
    this.showList = this.showList.bind(this)

  }

  componentWillMount() {
    $.ajax({
      url: `/boards/${this.props.boardId}/lists`,
      type: 'GET',
      dataType: 'JSON'
    }).done( lists => {
      this.setState({ lists })
    }).fail( data => {
      // TODO: Handle this better!
      alert('Failed grabbing board lists.');
    });
  }

  showList(list) {
    this.setState({ show: true, list})
  }

  addList(list) {
    this.setState({ lists: [{...list}, ...this.state.lists] })
  }


  deleteList(id) {
    $.ajax({
      url: `/boards/${this.props.boardId}/lists/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( data => {
      let lists = this.state.lists
      let index = lists.findIndex( l => l.id === id);
      this.setState({
        lists: [
          ...lists.slice(0, index),
          ...lists.slice(index + 1, lists.length)
        ]
      })
    }).fail( data => {
      alert('List did not delete');
    });
  }

  render() {
    let lists = this.state.lists.map( list => {
      return(<List key={`list-${list.id}`} {...list} deleteList={this.deleteList} />)
    });
    return(
      <div>
        <NewList boardId={this.props.boardId} addList={this.addList.bind(this)}/>
        <br />
        <div className="row">
          {lists}
        </div>
      </div>
    )

  }
}