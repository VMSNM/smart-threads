import { useParams } from "react-router-dom";
import UserHeader from "../components/header/userinfo/UserHeader"
import UserPosts from "../components/posts/UserPosts"
import useGetUser from "../hooks/actions/useGetUser";
import { useUserPageContext } from "../context/UserPageContext";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

const UserPage = () => {
    const { username } = useParams();
    const { loading, getUser } = useGetUser();
    const { user, setUser } = useUserPageContext();

    useEffect(() => {
      const result = async () => {
        await getUser(username, setUser);
      };
      result();
    }, [username]);

    if (!user) return null;

    return (
      <>
        { loading && (
          <Box display={'flex'} width={'100%'} height={'300px'} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress />
          </Box>
        )}
        { user && (
          <>
            <UserHeader />
            <UserPosts />
          </>
      )}
    </>
  )
}

export default UserPage