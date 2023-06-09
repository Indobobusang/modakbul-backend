import feedDao from "../models/feedDao";

const postFeedByUserId = async (
  userId: number,
  images: any,
  title: string,
  content: string,
  x: number,
  y: number
) => {
  return await feedDao.postFeedByUserId(userId, images, title, content, x, y);
};

const getFeedDetail = async (postId: number) => {
  let feed = await feedDao.getFeedById(postId);
  feed[0].userFeedLike = false;
  feed[0].userFeedScrap = false;

  return feed;
};

const getFeedDetailById = async (postId: number, userId: number) => {
  let feed = await feedDao.getFeedByUserId(postId, userId);
  if (feed[0].userFeedLike === "0") {
    feed[0].userFeedLike = false;
  } else if (feed[0].userFeedLike === "1") {
    feed[0].userFeedLike = true;
  }
  if (feed[0].userFeedScrap === "0") {
    feed[0].userFeedScrap = false;
  } else if (feed[0].userFeedScrap === "1") {
    feed[0].userFeedScrap = true;
  }
  let loginUser = await feedDao.loginUserInfo(userId);

  return { feed, loginUser };
};

const getFeedCommentById = async (postId: number, startIndex: number) => {
  let comment = await feedDao.getFeedCommentById(postId, startIndex);
  for (let i = 0; i < comment.length; i++) {
    comment[i].commentUserLike = false;
  }

  return comment;
};

const getFeedCommentByUserId = async (
  userId: number,
  postId: number,
  startIndex: number
) => {
  let comment = await feedDao.getFeedCommentByUserId(
    userId,
    postId,
    startIndex
  );

  for (let i = 0; i < comment.length; i++) {
    if (comment[i].commentUserLike === "0") {
      comment[i].commentUserLike = false;
    } else if (comment[i].commentUserLike === "1") {
      comment[i].commentUserLike = true;
    }
  }
  return comment;
};

export default {
  postFeedByUserId,
  getFeedDetail,
  getFeedDetailById,
  getFeedCommentById,
  getFeedCommentByUserId,
};
