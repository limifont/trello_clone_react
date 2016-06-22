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


  render() {
    let items = this.state.items.map( item => {
      return(<h3>Items!</h3>)
    });

    return(
      <div>
        <h3>Add some items</h3>
      </div>
    )
  }
}