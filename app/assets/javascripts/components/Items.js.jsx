class Items extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: [] }
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount() {
      $.ajax({
        url: `boards/${this.props.boardId}/lists/${this.props.listId}/items`,
        type: 'GET',
        dataType: 'JSON'
      }).done( items => {
        this.setState({ items })
      }).fail( data => {
        // TODO: Handle this better!
        alert('Failed grabbing list items')
      });
  }

  addItem(item) {
    this.setState({ items: [{...item}, ...this.state.items] })
  }

  deleteItem(id) {
      debugger
    $.ajax({
      url: `/boards/${this.props.boardId}/lists/${this.props.listId}/items/${id}`,
      type: 'DELETE',
      dataType: 'JSON' 
    }).done( data => {
      let items = this.state.items;
      let index = items.findIndex( i => i.id === id);
      this.setState({
        items: [
          ...items.slice(0, index),
          ...items.slice(index + 1, items.length)
        ]
      })
    }).fail( data => {
      alert('Item did not delete');
    })
  }

  render() {
    let items = this.state.items.map( item => {
      return(<Item key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} />);
    });

    return(
      <div>
        <h3>Add some items</h3>
        <NewItem boardId={this.props.boardId} listId={this.props.listId} addItem={this.addItem.bind(this)} />
        <div className="row">
          {items}
        </div>
      </div>
    )
  }
}