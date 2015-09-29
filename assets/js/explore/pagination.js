var Pagination = React.createClass({
  getInitialState: function () {
    return {
      page: this.props.page,
      total_pages: this.props.total_pages
    };
  },
  componentDidMount: function () {
    this.setState({
      page: this.props.page,
      total_pages: this.props.total_pages
    });
  },
  render: function () {
    var total_pages = this.state.total_pages;
    var page = this.state.page;
    var prev_page = (page == 1) ? 1 : page-1;
    var next_page = (page == total_pages) ? total_pages : page+1;
    var prev_disabled = (page == 1) ? 'disabled' : '';
    var next_disabled = (page == total_pages) ? 'disabled' : '';

    var pagination_n = 7;
    var count = page - 4;
    count = (page < 4) ? 0 : count;
    count = (page > total_pages-4) ? total_pages-7 : count;
    var na = Array.apply(null, {length: pagination_n}).map(Number.call, Number)
    var page_numbers = na.map(function (content) {
      count += 1;
      var active = (count == page) ? 'active' : '';
      return (
          <li className={active}><a href={'/explore/'+count}>{count}</a></li>
        );
    });
    return (
        <div>
            <nav>
              <ul className="pagination pagination-sm">
                <li className={prev_disabled}>
                  <a href={'/explore/'+prev_page} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {page_numbers}
                <li className={next_disabled}>
                  <a href={'/explore/'+next_page} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
        </div>
      );
  }
});