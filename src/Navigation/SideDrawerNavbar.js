import React, { useState } from 'react';
import { Link } from 'gatsby';
import { FaBars, FaChevronLeft, FaColumns, FaThLarge } from 'react-icons/fa';
import { navigate } from 'gatsby';
import {  useLocation } from '@reach/router';
import styled from '@emotion/styled';
import * as nav from '../styles/navbar.module.css';

const SideDrawerNavbar = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);
const light = props.light;
const setHideSearch =  props.setHideSearch;
const HideSearch =  props.HideSearch
const setLight = props.setLight;
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
    setHideSearch(!HideSearch);
  };


  const [hiddenav, setHidenav] = useState(false);

  function handleSethiddenav(isActive) {
    if (isActive) {
      setHidenav(true);
    } else {
      setHidenav(false);
    }
  }
  if (typeof window !== 'undefined') {
    showDrawer ? document.body.style.overflow ='hidden' :  document.body.style.overflow = '' ;
}
  const location = useLocation();

  let isBlogActive;

  if (location.pathname.startsWith('/news/Posted/Postit')) {
    isBlogActive = true;
  } else if (location.pathname.startsWith('/profileComponents/Myprofile')) {
    isBlogActive = true;
  } else {
    isBlogActive = false;
  }





 return (
    <>
      <FaThLarge  style={{zIndex: "12", color: props.light ?  "white" : "#121212"}} onClick={toggleDrawer} className=" bggl barsp ml1   color-light ml-5" />
      <StyledDrawer style={{zIndex: "12", backgroundColor: props.light ? "#121212": "white" }} show={showDrawer} >

      <div style={{height:"fit-content",height:"90vh",  position:"relative", left:"0", right:"0", bottom:"0"}}>
        <StyledNav>
          <StyledNavItem>
            <Link style={{ color: props.light ? "white": "#121212" }} to="/">news</Link>
          </StyledNavItem>
          <StyledNavItem>
            <Link style={{ color: props.light ? "white": "#121212" }} to="/morenews/Buisness">Business</Link>
          </StyledNavItem>
          <StyledNavItem>
            <Link style={{ color: props.light ? "white": "#121212" }} to="/morenews/Sports">Sports</Link>
          </StyledNavItem>
          <StyledNavItem>
            <Link style={{ color: props.light ? "white": "#121212" }} to="/morenews/Technology">Technology</Link>
          </StyledNavItem>
          <StyledNavItem>
            <Link style={{ color: props.light ? "white": "#121212" }} to="/morenews/Entertainment">Entertainment</Link>
          </StyledNavItem>

          <StyledNavItem>
        <Link style={{ color: props.light ? "white": "#121212" }} to="/morenews/Politics">Politics</Link>

          </StyledNavItem>
          <StyledNavItem>
<Link style={{ color: props.light ? "white": "#121212" }} to="/morenews/Trending">Trending</Link>

</StyledNavItem>

<StyledNavItem>
<Link style={{ color: props.light ? "white": "#121212" }} to="/morenews/Magazine">Magazine</Link>

</StyledNavItem>

<StyledNavItem>
<li><Link style={{ color: props.light ? "white": "#121212" }} to="/morenews/Art">Art</Link></li>

</StyledNavItem>

<StyledNavItem>
<Link style={{ color: props.light ? "white": "#121212" }} to="/morenews/Travel">Travel</Link>

</StyledNavItem>
    <StyledNavItem>
          <Link style={{ color: props.light ? "white": "#121212", marginLeft:"-20px" }}   getProps={({ isActive }) => ({  onClick: () =>  handleSethiddenav(isActive) }) }  className={`${isBlogActive && nav.isActive } nav-link`}  to="/news/Posted/Postit">ALL POSTS</Link>
  </StyledNavItem>
          
  

  
  </StyledNav>      <StyledFoot>
<StyledNavList  style={{listStyle:"none", color: !props.light ? "white": "#121212", marginLeft:"-20px" }}>About</StyledNavList>
<StyledNavList  style={{listStyle:"none", color: !props.light ? "white": "#121212", marginLeft:"-20px" }}>privacy</StyledNavList>
<StyledNavList  style={{listStyle:"none", color: !props.light ? "white": "#121212", marginLeft:"-20px" }}>terms</StyledNavList>
<StyledNavList  style={{listStyle:"none", color: !props.light ? "white": "#121212", marginLeft:"-20px" }}>Contacts</StyledNavList>
<StyledNavList  style={{listStyle:"none",textDecoration:"none", color: !props.light ? "white": "#121212", marginLeft:"-20px" }}> &copy; Blabzio 2022 - {new Date().getFullYear()} </StyledNavList>

  </StyledFoot>
</div>

  <StyledFooter  onClick={toggleDrawer}><FaChevronLeft/></StyledFooter>

      </StyledDrawer>
 

      <StyledBackdrop  show={showDrawer} onClick={toggleDrawer} />
    </>
  );
};

const StyledDrawer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom:0;
  height: ;
  width: 250px;
  background:   ${ (props) => props.light ? "#121212" : "white" }  ;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
  z-index: 11;
  border-right: 1px solid purple;
 overflow: auto; 
  @media (min-width: 1000px) {
    display: none;
  }

  ${(props) =>
    props.show &&
    `
    transform: translateX(0);
  `}
`;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-out, visibility 0s 0.3s ease-out;
  z-index: 9;

  ${(props) =>
    props.show &&
    `
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease-out;
  `}
`;

const StyledLogo = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
   justify-content: center;
  font-size: 1.4em;
  font-weight: bold;
  margin-bottom: 1em;
  margin-left: 2px;
  color: #fdfdf7;
  text-shadow: 1px 1px 1px black;
  `;

const StyledNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: calc(100% - 60px - 50px);
  padding-left: 25%;
 margin-top: 100px
`;



const StyledNavItem = styled.li`
  padding: 1em;
  a {
    color:   ${(props) => props.light ? "silver" : "#333" } ;
    text-decoration: none;
    font-weight: bold;
    display: block;
    text-shadow: 1.3px 1.2px 1.4px rgba(0.0.0.0.75);
    
   
  }
`;

const StyledFoot = styled.ul`
display: grid;
grid-template-columns: auto auto ;
  padding: 10px;
  margin: 0;
background-color: black;
position: absolute;
bottom: 20px;
left: 0;
right: 0;
font-size: 12px;
width:100%;
margin:auto;
color: ghostwhite !important


list-style-type: none
`;

const StyledNavList = styled.li`
  padding: 1em;
  padding-left: 25px;
  color:white';
  list-style-type: none !important;
  a {
    color: white;
    text-decoration: none;
    font-weight: 100;
    color: gray;
    font-size: 12px;
    padding: 3px;
 list-style: none;
    } `;




const StyledFooter = styled.div`
  height: 50px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8em;
  color: #333;
  font-weight: bold;
  position: absolute;
  top:0px;
  left: 210px;
 
`;

export default SideDrawerNavbar;

