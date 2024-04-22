import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

const createPost = async (req, res) => {    
    try {
        const { text, img } = req.body;
        const postedBy = req.user._id;
        if (!text) return res.status(400).json({ error: 'Text field is required' });

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const maxLength = 500;
        if (text.length > maxLength) return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });

        const newPost = new Post({
            postedBy,
            text,
            img
        })
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.log("Error in createPost controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);

    } catch (error) {
        console.log("Error in getPost controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.postedBy.toString() !== req.user._id.toString()) return res.status(401).json({ error: 'Unauthorized to delete this post' });

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Post successfully deleted', post });

    } catch (error) {
        console.log("Error in deletePost controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId)
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            // Unlike post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
			res.status(200).json({ message: "Post unliked successfully", post });

        } else {
            // Like post
            post.likes.push(userId);
            await post.save();
            res.status(200).json({ message: "Post liked successfully", post });
        }

    } catch (error) {
        console.log("Error in likeUnlikePost controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const replyToPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { text } = req.body;
        console.log(text)
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;
        
        if (!text) return res.status(400).json({ error: 'Text field is required' });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const reply = { userId, text, userProfilePic, username };
        post.replies.push(reply);
        await post.save();

        res.status(200).json(reply);

    } catch (error) {
        console.log("Error in replyToPost controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const following = user.following;
        const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

        res.status(200).json(feedPosts);
        console.log(user)
    } catch (error) {
        console.log("Error in getFeedPosts controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getUserPosts = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne( { username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });

        res.status(200).json(posts);
        console.log(user)
    } catch (error) {
        console.log("Error in getUserPosts controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts };