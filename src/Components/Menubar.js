import React from "react";
import {Link,withRouter} from "react-router-dom";
import styled from "styled-components";
import '../styles/home.css';
import logo from "../img/logo.png"
const Header = styled.header`
    


    width:100%;
    height:50px;
    display:flex;

    
    background-color: #f5f7fa;
    padding : 0px 10px;



`;
const List = styled.ul`
  display: flex;`;

const Item = styled.li`


 
  
`;

const SLink = styled(Link)`

`;


export default withRouter(({location:{pathname}})=>(
    <Header>
    <List className="gnb_bg">
    <Item current={pathname === "/"}><SLink to="/" className="Drawing"><img src={logo} className="logo"/></SLink></Item>

    <Item current={pathname === "/"}><SLink to="/" className="Drawing">Main</SLink></Item>
    <Item current={pathname === "/maker"}><SLink to="/maker" className="Drawing" >Drawing</SLink></Item>
    <Item current={pathname === "/collection"}><SLink to="/collection" className="collection1" >collection</SLink></Item>

    <Item current={pathname === "/collection2"}><SLink to="/collection2" className="collection2">collection2</SLink></Item>
    
    </List>
    </Header>));

