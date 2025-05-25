export const API_ROOT = "https://www.reddit.com";

export const getSubredditPosts = async (subreddit, limit = 10) => {
  const response = await fetch(`${API_ROOT}${subreddit}.json`);
  const json = await response.json();
};

export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();
  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (postId) => {
  const response = await fetch(`${API_ROOT}/comments/${postId}.json`);
  const json = await response.json();
  return json[1].data.children.map((subreddit) => subreddit.data);
};
