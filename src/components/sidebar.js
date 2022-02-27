import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; import React from 'react'
import FiberDvrIcon from '@mui/icons-material/FiberDvr';
import styled from 'styled-components'
import { Apps, Bookmark, BookmarkBorder, Create, Drafts, Expand, ExpandLess, FileCopy, Inbox, InsertComment, PeopleAlt, ExpandMore, Add, DockSharp, Logout } from '@mui/icons-material';
import SidebarOptionalContainer from './SideBarComponents';
import { db } from '../firebaseFile';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebaseFile";
import { Alert } from '@mui/material';
import { signOut } from 'firebase/auth';
const SideBar = () => {

    const [user] = useAuthState(auth)

    let c_data = []
    const [channel, setChannel] = useState([]);
    const fetchDoc = async () => {
        const path = collection(db, "rooms")
        const docs = await getDocs(path)
        // const data= await docs.json();
        console.log(typeof (docs));

        return docs._docs

    }
    const UpdateSnapShot = (data) => {
        setChannel(data);


    }
    const signOutAction = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            <Alert severity="success">Log Out Successfully </Alert>
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        fetchDoc().then((docs) => {

            console.log(docs);
            const channelList = [];

            docs.map((doc) => {

                const messg = {
                    name: doc._document.data.value.mapValue.fields.name.stringValue,
                    id: doc.id

                }
                channelList.push(messg)



            })


            setChannel(channelList)
        })


    }, [])
    const channels = channel.map((doc) => {


        return <SidebarOptionalContainer
            key={doc.id}
            id={doc.id}

            title={doc.name}
        />
    })

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SideBarInfo>
                    <h2>Gulab ORG HQ</h2>

                    <h3>

                        <FiberManualRecordIcon />
                        {user.displayName}

                    </h3>

                </SideBarInfo>
                <Create />

            </SidebarHeader>

            <SidebarOptionalContainer Icon={InsertComment} title="Threads" />
            <SidebarOptionalContainer Icon={Inbox} title="Mentions & reactions" />
            <SidebarOptionalContainer Icon={Drafts} title="Saved items" />
            <SidebarOptionalContainer Icon={BookmarkBorder} title="Channel browser" />
            <SidebarOptionalContainer Icon={PeopleAlt} title="People & user groups" />
            <SidebarOptionalContainer Icon={Apps} title="Apps" />
            <SidebarOptionalContainer Icon={FileCopy} title="File browser" />
            <SidebarOptionalContainer Icon={ExpandLess} title="Show Less" />
            <hr />
            <UserAction onClick={signOutAction}>
                <Logout /> <h3> LogOut </h3>
            </UserAction>
            <SidebarOptionalContainer Icon={ExpandMore} title="Channel" />
            <hr />
            <SidebarOptionalContainer UpdateSnapShot={UpdateSnapShot} add Icon={Add} title="Add Channel" />
            {/* <hr /> */}
            {
                channels
            }



        </SidebarContainer>
    )
}
export default SideBar;

const SidebarContainer = styled.div`
background-color: var(--slack-color);
color: white;
/* display: flex; */
border-top: 1px solid #49274b;
margin-top: 60px;
max-width: 260px;
flex:0.3;s
> hr{
   margin-top: 10px;
   margin-bottom: 10px;
   border: 1px solid #49274b;
}
`
const SidebarHeader = styled.div`
display: flex;
border: 1px solid #49274b ;
padding: 13px;
 > .MuiSvgIcon-root{
     /* margin-left: auto; */
     /* margin-top: 13px; */
     background-color: white;
     color: #49274b;
     border-radius: 999px;
     padding: 8px;
     font-size: 13px;

 }
`
const SideBarInfo = styled.div`
flex:1;
> h2{
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
}
> h3{
 display   :flex ;
 font-size: 13px;
 align-items: center;
 font-weight: 400;


}
> h3 > .MuiSvgIcon-root{
    font-size: 14px;
    color: green;
    margin-right: 2px;
    margin-top:1px;

}
/* display: flex; */

`
const UserAction = styled.div`
cursor: pointer;
margin-left: 5px;
display: flex;
font-size: 12px;
align-items: center;
padding-left: 2px;
> h3{
    font-weight:600;
padding:10px 0px;
margin-left: 2px ;
}
`