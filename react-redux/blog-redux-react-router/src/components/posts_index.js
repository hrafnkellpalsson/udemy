import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id }>
          {post.title}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

// export default connect(null, { fetchPosts: fetchPosts } )(PostsIndex);
// or using ES6
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
// This syntax is identical in functionality to using the mapDispatchToProps
// function. However, we do get more control with that function, we can for
// example do some computation on how exactly we want to call the action creator.
