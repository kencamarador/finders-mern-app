import { Link } from 'react-router-dom'
import styled from 'styled-components';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

const Sidebar = () => {
    return(

      <Box sx={{ width: '100%', maxWidth: 280, bgcolor: 'background.paper', height: 1000, borderRightColor: '#d9e2ec', borderRightStyle: 'solid', borderRightWidth: '0.1em'}}>
      <Wrapper>
      <nav aria-label="main mailbox folders">
        <List> 
          <Link className='text-link' to="/">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ArticleRoundedIcon  />
              </ListItemIcon>
              <ListItemText primary="All Jobs"/>
            </ListItemButton>
          </ListItem>
          </Link>
          <Link className='text-link' to="/create">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AddCircleRoundedIcon  />
              </ListItemIcon>
              <ListItemText primary="Add Job"/>
            </ListItemButton>
          </ListItem>
          </Link>
          <Link className='text-link' to="/profile">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxRoundedIcon/>
              </ListItemIcon>
              <ListItemText primary="Profile"/>
            </ListItemButton>
          </ListItem>
          </Link>
        </List>
      </nav>

      </Wrapper>
    </Box>

  );
}

const Wrapper = styled.section`
.text-link {
  color: black;
  text-decoration: none;
}

`
export default Sidebar
