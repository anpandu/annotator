var ContentRowCard = React.createClass({
    render: function () {
        var content = this.props.content;
        var label = content.title.charAt(0).toUpperCase() + content.title.slice(1).toLowerCase();
        var link = '/tag/' + content.id;

        return (
            <div>
              <tr>
                <td>{this.props.number}</td>
                <td>{label}</td>
                <td>-</td>
                <td>
                    <a href={link}>edit</a>
                </td>
              </tr>
            </div>
        );
    }
});

var ContentsCard = React.createClass({
    getInitialState: function () {
        return {contents: this.props.contents};
    },
    componentDidMount: function () {
        this.setState({contents: this.props.contents});
    },
    render: function () {
        var count = 0
        var contentsCards = this.state.contents.map(function (content) {
            count += 1;
            return (
                <ContentRowCard content={content} number={count}></ContentRowCard>
            );
        });
        return (
            <div>
                <table className="table table-bordered">
                  <tr>
                    <td>No</td>
                    <td>Title</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                  <div>{contentsCards}</div>
                </table>
            </div>
        );
    }
});