class NewItem extends React.Component {
  constructor(props) {
    super(props);
  }

  addItem(e) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.props.boardId}/lists/${this.props.listId}/items`,
      type: 'POST',
      data: { item: { name: this.refs.name.value }},
      dataType: 'JSON'
    }).done( item => {
      this.props.addItem(item);
      this.refs.addItem.reset();
    }).fail( data => {
      alert('Fail. FAIL. FAIL!!!!!!');
    })

  }

  render() {
    return(
      <div>
        <h4>Add New Item</h4>
        <form ref="addItem" onSubmit={this.addItem.bind(this)}>
          <input type="text" ref="name" placeholder="Item Name" required autofocus />
          <input type="submit" className="btn" value="Add" />
        </form>
      </div>
    )
  }
}