var TagCard = React.createClass({
    getInitialState: function() {
      return {tag: this.props.tag};
    },
    handleChange: function(event) {
      var new_tag = JSON.parse(JSON.stringify(this.state.tag));
      new_tag.content = event.target.value;
      this.setState({tag: new_tag});
      this.props.handleChange(new_tag);
    },
    addCopy: function () {
        this.props.addCopyToTagList(this.state.tag);
    },
    remCopy: function () {
        this.props.remCopyFromTagList(this.state.tag);
    },
    render: function () {
        var tag = this.props.tag;
        var label = tag.title.charAt(0).toUpperCase() + tag.title.slice(1).toLowerCase();
        return (
            <div className="form-group">
              <label for="{tag.title}" className="col-sm-3 control-label">{label}</label>
              <div className="col-sm-9">
                <div className="input-group">
                    <input type="text" className="form-control" id={tag.title} placeholder={tag.title} name={tag.title} defaultValue={tag.content} onChange={this.handleChange}/>
                    <span role="button" onClick={this.addCopy} className="input-group-addon">+</span>
                    <span role="button" onClick={this.remCopy} className="input-group-addon">x</span>
                </div>
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
    handleAddCopy: function (data) {
        var new_tags = JSON.parse(JSON.stringify(this.state.tags));
        var new_data = JSON.parse(JSON.stringify(data));
        var idx = 0;
        for (var i = 0; i < new_tags.length; i++) if (new_tags[i].tag_id == data.tag_id) idx = i+1;
        new_data.tag_id = Math.random();
        new_data.content = '';
        new_tags.splice(idx, 0, new_data);
        React.unmountComponentAtNode(document.getElementById('tag_list'));
        React.render( <TagList tags={new_tags}/>, document.getElementById('tag_list') );
    },
    handleRemCopy: function (data) {
        var new_tags = JSON.parse(JSON.stringify(this.state.tags));
        var new_data = JSON.parse(JSON.stringify(data));
        var idx = 0;
        for (var i = 0; i < new_tags.length; i++) 
            if (new_tags[i].tag_id == data.tag_id)
                idx = i;
        new_tags.splice(idx, 1);
        React.unmountComponentAtNode(document.getElementById('tag_list'));
        React.render( <TagList tags={new_tags}/>, document.getElementById('tag_list') );
    },
    handleTagChange : function (data) {
        var new_tags = JSON.parse(JSON.stringify(this.state.tags));
        var new_data = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < new_tags.length; i++) 
            if (new_tags[i].tag_id == data.tag_id)
              new_tags[i] = new_data
        this.setState({tags: new_tags});
        this.forceUpdate();
    },
    render: function () {
        var _this = this;
        var tagCards = this.state.tags.map(function (tag) {
            tag.tag_id = ('tag_id' in tag) ? tag.tag_id : Math.random();
            return (
                <TagCard tag={tag} addCopyToTagList={_this.handleAddCopy} remCopyFromTagList={_this.handleRemCopy} handleChange={_this.handleTagChange}></TagCard>
            );
        });
        return (
            <div>{tagCards}</div>
        );
    }
});