var TagCard = React.createClass({
    render: function () {
        var tag = this.props.tag;
        var label = tag.title.charAt(0).toUpperCase() + tag.title.slice(1).toLowerCase();
        return (
            <div className="form-group">
              <label for="{tag.title}" className="col-sm-3 control-label">{label}</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id={tag.title} placeholder={tag.title} name={tag.title} defaultValue={tag.content}/>
              </div>
            </div>
        );
    }
});
var TagList = React.createClass({
    getInitialState: function () {
        return {tags: this.props.tags};
    },
    componentDidMount: function () {
        this.setState({tags: this.props.tags});
    },
    render: function () {
        var tagCards = this.state.tags.map(function (tag) {
            return (
                <TagCard tag={tag}></TagCard>
            );
        });
        return (
            <div>{tagCards}</div>
        );
    }
});