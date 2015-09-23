var ContentCard = React.createClass({
    getInitialState: function () {
        return {content: this.props.content};
    },
    componentDidMount: function () {
      this.setState({content: this.props.content});
    },
    render: function () {
        var ta_content = this.state.content;
        return (
          <div>
            <form>
              <div className="form-group">
                <input readOnly type="text" className="form-control" value={ta_content.title}/>
              </div>
              <div className="form-group">
                <textarea readOnly className="form-control" rows="15" value={ta_content.text}></textarea>
              </div>
            </form>
          </div>
        );
    }
});