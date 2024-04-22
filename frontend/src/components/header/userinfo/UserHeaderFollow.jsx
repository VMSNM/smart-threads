import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { CircularProgress, IconButton } from '@mui/material';
import useFollow from '../../../hooks/actions/useFollow';
import { useUserPageContext } from '../../../context/UserPageContext';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserHeaderFollow = () => {
    const navigate = useNavigate();

    const { authUser } = useAuthContext();
    const { user, setUser } = useUserPageContext();
    
    const { follow, loading } = useFollow();
    const [isFollowing, setIsFollowing] = useState(false)

    const handleFollowing = async () => {
        const success = await follow(user?._id);
        if (success) {
            if (!isFollowing) {
                setUser({...user, followers: [...user.followers, authUser?._id]});
                toast.success('User followed successfully');
            } 
            
            else {
                setUser({...user, followers: user.followers.filter(element => element.toLocaleString() !== authUser?._id.toLocaleString())});
                toast.success('User unfollowed successfully');
            } 
            navigate(`/${user?.username}`);
        }
    }

    useEffect(() => {
        try {
            setIsFollowing(user?.followers?.includes(authUser?._id));    
        } catch (error) {
            toast.error('Something went wrong, please refresh page')
        }
    }, [user])

    useEffect(() => {
        try {
            setIsFollowing(user?.followers?.includes(authUser?._id));    
        } catch (error) {
            toast.error('Something went wrong, please refresh page')
        }
    }, [])

    if (authUser?._id === user?._id) return;

    if (loading) return <CircularProgress />

    return (
        <IconButton 
            title={ isFollowing ? 'Unfollow' : 'Follow' }
            onClick={handleFollowing}
        >
            { isFollowing ? <StarIcon sx={{color:'#FFFF6E'}} /> : <StarBorderIcon sx={{color:'#FFFF6E'}} /> }
        </IconButton>
    )
}

export default UserHeaderFollow;