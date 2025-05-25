import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from "react-icons/ti";
import Card from "../../components/Card";
import Comment from "../../components/Comment/Comment";
import Avatar from "../../features/Avatar/Avatar";
import moment from "moment";

const Post = (props) => {
  const [voteValue, setVoteValue] = useState(0);

  const { post, onToggleComments } = props;

  const onHandleVote = (newVoteValue) => {
    if (newVoteValue === voteValue) {
      setVoteValue(0);
    } else if (newVoteValue === 1) {
      setVoteValue(1);
    } else {
      setVoteValue(-1);
    }
  };

  const newUpVote = () => {
    if (voteValue === 1) {
      return <TiArrowUpThick className="icon-action" />;
    }
    return <TiArrowUpOutline className="icon-action" />;
  };

  const newDownVote = () => {
    if (voteValue === -1) {
      return <TiArrowDownThick className="icon-action" />;
    }
    return <TiArrowDownOutline className="icon-action" />;
  };

  const getVoteType = () => {
    if (voteValue === 1) {
      return "upvoted";
    } else if (voteValue === -1) {
      return "downvoted";
    }
    return "";
  };

  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div>
          <h3>Error loading comments</h3>
        </div>
      );
    }

    if (post.loadingComments) {
      return (
        <div>
          <h3>Loading comments...</h3>
        </div>
      );
    }

    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <article key={post.id}>
      <Card>
        <div className="post-wrapper">
          <div className="post-votes-container">
            <button
              type="button"
              className={`icon-action-button up-vote ${
                voteValue === 1 && "active"
              }`}
              onClick={() => onHandleVote(1)}
              aria-label="Up vote"
            >
              {newUpVote()}
            </button>
            <p className={`post-votes ${getVoteType()}`}>{post.score}</p>
            <button
              type="button"
              className={`icon-action-button down-vote ${
                voteValue === -1 && "active"
              }`}
              onClick={() => onHandleVote(-1)}
              aria-label="Down vote"
            >
              {newDownVote()}
            </button>
          </div>
          <div className="post-content">
            <h3 className="post-title">{post.title} </h3>

            <div className="post-image-content">
              <img src={post.url} alt="" className="post-image" />
            </div>

            <div className="post-info">
              <span className="post-author">
                <Avatar name={post.author} />
                <span className="author-username">{post.author}</span>
              </span>

              <span>{moment.unix(post.created_utc).fromNow()}</span>
              <span className="post-comments-content">
                <button
                  type="button"
                  className={`icon-action-button ${
                    post.showingComments && "showing-comments"
                  }`}
                  onClick={() => onToggleComments(post.permalink)}
                  aria-label="Show Comments"
                >
                  <TiMessage className="icon-action" />
                </button>
              </span>
            </div>
            {renderComments()}
          </div>
        </div>
      </Card>
    </article>
  );
};

export default Post;
