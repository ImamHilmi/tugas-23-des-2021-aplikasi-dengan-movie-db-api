import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieIcon from '@mui/icons-material/Movie';
import ComputerIcon from '@mui/icons-material/Computer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (value === 0)
            navigate("/");
        else if (value === 1)
            navigate("/movies");
        else if (value === 2)
            navigate("/series");
        else if (value === 3)
            navigate("/search");
    }, [value, navigate])

  return (
      <>
        <Box sx={{ 
            width: "100%",
            position: "fixed",
            bottom: 0,
            boxShadow: 3,
            // backgroundColor: "#333333",
            zIndex: 100,
        }}>
        <BottomNavigation
            showLabels
            value={value}
            style={{backgroundColor: "#222942"}}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
        >
            <BottomNavigationAction style={{color:"#f4f4f4"}} label="Trending" icon={<TrendingUpIcon />} />
            <BottomNavigationAction style={{color:"#f4f4f4"}} label="Movies" icon={<MovieIcon />} />
            <BottomNavigationAction style={{color:"#f4f4f4"}} label="TV Series" icon={<ComputerIcon />} />
            <BottomNavigationAction style={{color:"#f4f4f4"}} label="Search" icon={<SearchIcon />} />
        </BottomNavigation>
        </Box>
    </>
  );
}