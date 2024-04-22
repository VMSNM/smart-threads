import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FeedTab from '../components/homepage/FeedTab';
import { useEffect, useState } from 'react';
import SuggestedTab from '../components/homepage/SuggestedTab';
import FollowingTab from '../components/homepage/FollowingTab';
import { useAuthContext } from '../context/AuthContext';
import FollowersTab from '../components/homepage/FollowersTab';

const Homepage = () => {
  const [value, setValue] = useState('one');
  const handleChange = (event, newValue) => setValue(newValue);

  const {authUser} = useAuthContext();

  useEffect(() => {
    authUser ? "" : setValue('one');
  }, [authUser])

  return (
  <>
  <Box sx={{ width: '100%' }} mb={4} mt={2}>
    <Tabs
      centered
      value={value}
      variant='fullWidth'
      scrollButtons="auto"
      onChange={handleChange}
      textColor="primary"
      indicatorColor="primary"
      aria-label="secondary tabs example"
    >
      <Tab value="one" label="Feed" />
      <Tab value="two" label="Following" />
      <Tab value="three" label="Followers" />
      <Tab value="four" label="Suggested" />
    </Tabs>
  </Box>

    { value === 'one' && <FeedTab /> }
    { value === 'two' && <FollowingTab /> }
    { value === 'three' && <FollowersTab /> }
    { value === 'four' && <SuggestedTab /> }
    </>
  )
}

export default Homepage;