import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import { getPost } from '../../actions/post';
import withRouter from '../utils/withRouter';

const Post = ({ getPost, post: { post, loading }, params }) => {
  useEffect(() => {
    getPost(params.id);
  }, [getPost, params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  post: state.post,
});

export default connect(mapStateToProp, { getPost })(withRouter(Post));
