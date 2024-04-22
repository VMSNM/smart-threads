import Comment from "./Comment";

const Comments = ({user, post, setPost}) => {
  if (!post) return null;

  return (
    <>
      { post?.replies && post?.replies.map((reply, idx) => (
        <Comment key={idx} reply={reply} user={user} post={post} setPost={setPost} 
          lastReply={reply?._id === post?.replies[post?.replies.length - 1]._id}
        />
      ))}
    </>
  )
}

export default Comments;