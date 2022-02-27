import styled from "styled-components";
import { Avatar } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { HelpOutline } from "@mui/icons-material";
import { style } from "@mui/system";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebaseFile";

const Header = () => {
  const [user] = useAuthState(auth)
 



  return (
    <HeaderComponents>

      {/* Left Header  */}
      <HeaderLeft>
        <HeaderAvatar 
        src={user?.photoURL}/>
        <AccessTime />
      </HeaderLeft>

      {/* search Header  */}
      <HeaderSearch>
        <Search/>
        <input placeholder="Search"/>
      </HeaderSearch>


      { /* Right Header  */}
      <HeaderRight>
        <HelpOutline/>
      </HeaderRight>
    </HeaderComponents>
  )
}
export default Header;

const HeaderComponents = styled.div`
display: flex;
position: fixed;
width: 100%;
padding: 10px 0px;
align-items: center;
/* justify-content: space-between; */
background-color: var(--slack-color);

color: white;
`

const HeaderLeft = styled.div`
 flex: 0.3;
 display: flex; 
align-items: center;
margin-left :20px ;

> .MuiSvgIcon-root{
  margin-left: auto;
  margin-right: 30px;

}



`


const HeaderAvatar = styled(Avatar)`

cursor: pointer;
:hover{
  opacity: 0.8;
}
`;

const HeaderSearch=styled.div`
flex: 0.4;
opacity: 1;
border-radius: 6px;
background-color: #421f44;
text-align: center;
display: flex;
padding: 0px 50px;
border: 1px slid grey;

> input{
  background-color :transparent ;
 border: none;
 outline: 0;
color: white;
 min-width: 30vw;
}
`
const HeaderRight = styled.div`
flex: 0.3;
display: flex;
align-items: flex-end;

> .MuiSvgIcon-root{
  margin-left: auto;
  margin-right: 20px;

}
`