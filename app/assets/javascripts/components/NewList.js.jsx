class NewList extends React.Component {
  constructor(props) {
      super(props);
  }

  addList(e) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.props.boardId}/lists`,
      type: 'POST',
      data: { list: { name: this.refs.name.value } },
      dataType: 'JSON'
    }).done( list => {
        list = list;
      this.props.addList(list);
      // this.setState({ lists: [{...list}, ...this.state.lists ] });
      this.refs.addList.reset();
    }).fail( data => {
      // TODO: Handle this better!
    })
  }


  render() {
    return(
      <div>
      <h4>Add New List</h4>
      <form onSubmit={this.addList.bind(this)} ref="addList">
        <input type="text" ref="name" placeholder="List Name" required autofocus />
        <input type="submit" className="btn" value="Add" />
      </form>
      </div>
    )
  }
}
