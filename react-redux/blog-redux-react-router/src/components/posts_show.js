import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    // If we do not want to eagerly fetch data (we might already have this
    // particular post in memory) we can wrap this call in an if
    // if (!this.props.post)
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
    // We could have retrieved the id using this.props.post.id but this assumes
    // that post is available which might not be the case in the first render.
    // So, getting the id from the url is better.
  }

  render() {
    const { post } = this.props;

    // This is a very common pattern, if we don't have data yet, return
    // some placeholder.
    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back to index</Link>
        <button
            className="btn btn-danger pull-xs-right"
            onClick={this.onDeleteClick.bind(this)}
          >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// mapStateToProps is not just for selecting a piece of the global state,
// we can also do intermediate calculations and only return something modified
// to our props.
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
