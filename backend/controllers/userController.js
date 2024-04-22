import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js'
import Post from '../models/PostModel.js'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';
import mongoose from 'mongoose';

const getUserProfile = async (req, res) => {
    // query will either be username or userId
    const { query } = req.params;
    try {
        let user;
        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({ _id: query }).select('-password').select('-updatedAt').select('-isFrozen');
        }
        else {
            user = await User.findOne({ username: query }).select('-password').select('-updatedAt').select('-isFrozen');
        }
        if (!user) return res.status(400).json({ error: 'User not found' });
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getUserProfile controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

		const user = await User.findOne({ $or: [{ email }, { username }] });
		if (user) {
            console.log(user)
			return res.status(400).json({ error: "User already exists" });
		}
        if (password.length < 4) return res.status(400).json({ error: "Password must have at least 4 characters" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                bio: newUser.bio,
                profilePic: newUser.profilePic,
                following: [],
                followers: []
            })
        } else {
            res.status(400).json({ error: 'Invalid user data'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log('Error in sinupUser: ', error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: 'Invalid username or password'})
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic,
            following: user.following,
            followers: user.followers
        });

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log('Error in loginUser: ', error.message)
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 1})
        res.status(200).json({message: 'Logged out successfully'})
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}


const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToFollowUnfollow = await User.findById(id);
        const currentUser = await User.findById(req.user?._id);

        if (id === req.user?._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToFollowUnfollow || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow user
            // Modify currentUser following array, modify userToFollowUnfollow followers array
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
			res.status(200).json({ message: "User unfollowed successfully" });
            console.log({ message: "User unfollowed successfully" });

        } else {
            // Follow user
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            res.status(200).json({ message: "User followed successfully" });
            console.log({ message: "User followed successfully" });
        }
        
    } catch (error) {
        console.log("Error in followUnfollow controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const updateUser = async (req, res) => {
    const { name, username, email, password, profilePic, bio } = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({error: "User not found"});
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();

        // Find all posts that this user replied and update username and userProfilePic fields
		await Post.updateMany(
			{ "replies.userId": userId },
			{
				$set: {
					"replies.$[reply].username": user.username,
					"replies.$[reply].userProfilePic": user.profilePic,
				},
			},
			{ arrayFilters: [{ "reply.userId": userId }] }
		);

        console.log("User updated successfully", user)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic
        });
        
    } catch (error) {
        console.log("Error in updateUser controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getSuggestedUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').select('-updatedAt').select('-isFrozen');
        if (!users) return res.status(400).json({ error: 'No users found' });
        res.status(200).json(users)
    } catch (error) {
        console.log("Error in getSuggestedUsers controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getFollowingUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const following = user.following;

        const users = await User.find({ _id: { $in: following } }).sort({ createdAt: -1 });

        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getFollowingUsers controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getFollowers = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const followers = user.followers;

        const users = await User.find({ _id: { $in: followers } }).sort({ createdAt: -1 });

        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getFollowingUsers controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile, getSuggestedUsers, getFollowingUsers, getFollowers };