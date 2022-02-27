import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material'
import { style } from '@mui/system'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import ChatInput from './ChatInput'
import { db, app } from '../firebaseFile'
import { getFirestore, onSnapshot, query, collection, getDoc, doc, getDocs } from 'firebase/firestore'
import { orderBy } from 'firebase/firestore/lite'
import Message from './Message'
import { useRef } from 'react'
function Chat() {

    const roomId = useSelector((state) => state.appSlice.roomId)
    const [roomDetails, setRoomDetails] = useState(null)
    const [roomMessages, setRoomMessages] = useState(null)
    const chatBottomRef = useRef(null)
    const [bottomMessage, setBottomMessage] = useState([])
    let [channelComponent,setChannelComponent]=useState(null)

    // if (chatBottomRef != null) {
    //     chatBottomRef.current.scrollIntoView({ behavior: 'smooth' })
    // }
    // (chatBottomRef)?.current?scrollIntoView():;



    const fillBottomMessage = (data) => {
        setBottomMessage((bottomMessage) => {
            const updated = [...bottomMessage, data]
            updated.sort((a, b) => {
                return (a.timestamp - b.timestamp)
            })
            return updated
        })


        // chatBottomRef.scrollIntoView();
        if (chatBottomRef)
            chatBottomRef.current.scrollIntoView({ behavior: 'smooth' })



    }
    const getRoomeDetails = async () => {
        const DB = getFirestore(app)
        const path = doc(DB, "rooms", roomId)
        const docRef = getDoc(path);


        return docRef

    }

    const getRoomMessages = async () => {
        const DB = getFirestore(app)




        const q = query(collection(DB, "rooms", roomId, "messages"));

        const ref = await getDocs(q);
        console.log(ref);



        return ref


    }
    useEffect(() => {
        // if()
    
        if (roomId) {
            getRoomeDetails().then((roomDetails) => {
                console.log(roomDetails.data());
                setRoomDetails(roomDetails.data())
                // console.log(roomDetails);

            }).catch((e) => { console.log(e); })
        }
        if (roomId) {
            getRoomMessages().then((roomMessages) => {

                console.log(roomMessages.docs);

               
                const docRef = roomMessages.docs;

                const docs = [];
                docRef.map((ele) => {
                    const obj = {
                        ...ele.data(), id: ele.id
                    }
                   
                    docs.push(obj)
                  
                })

                docs.sort((a, b) => {
                    return (a.timestamp - b.timestamp)
                })
                setRoomMessages(docs)
                chatBottomRef.current.scrollIntoView({ behavior: 'smooth' })
       
                setBottomMessage([])

            }).catch((e) => { console.log(e); })
        }

    }, [roomId,chatBottomRef ])
    console.log("Room details : ", roomDetails);
    console.log("Room Messages : ", roomMessages);


    return (

        <ChatContainer>

            {/* <h1> Hey Hello Chat </h1> */}
            <>
                <Header>
                    <HeaderLeft>
                        <h4>
                            <strong> # Room Name </strong>
                        </h4>
                        <StarBorderOutlined />

                    </HeaderLeft>
                    <HeaderRight>
                        <p>
                            <InfoOutlined />Details
                        </p>

                    </HeaderRight>

                </Header>
                <ChatMessages>
                    {/* List Of All Messages  */}
                    {
                        (roomMessages) ? roomMessages.map((message) => {
                            const messageDatils = {
                                message: message.message,
                                timestamp: message.timestamp,
                                user: message.user,
                                image: message.userImage,
                                id: message.id
                            }
                            return <Message
                                key={messageDatils.id}
                                user={messageDatils.user}
                                message={messageDatils.message}
                                image={messageDatils.image}
                                timestamp={messageDatils.timestamp}
                            >


                            </Message>
                        }) : ''
                    }

                    {
                        (bottomMessage) ? bottomMessage.map((message) => {
                            const messageDatils = {
                                message: message.message,
                                timestamp: message.timestamp,
                                user: message.user,
                                image: message.userImage,
                                id: message.id
                            }
                            return <Message
                                key={messageDatils.id}
                                user={messageDatils.user}
                                message={messageDatils.message}
                                image={messageDatils.image}
                                timestamp={messageDatils.timestamp}
                            >


                            </Message>
                        }) : ''
                    }
                    <BottomChat  id="bottom" ref={chatBottomRef} />

                </ChatMessages >

            {
                (roomId)?(<ChatInput fillBottomMessage={fillBottomMessage} roomId={roomId} channelName={(roomDetails) ? roomDetails.name : null} />):""
            }{/* Message Writing */}

            </>
        </ChatContainer>)
}

export default Chat
const ChatContainer = styled.div`
flex: 0.7;
overflow-y: scroll;
flex-grow: 1;
margin-top: 60px;
`
const HeaderLeft = styled.div`
display: flex;
align-items: center;
> h4{
    margin-block-start: 0px;
    margin-block-end: 0px;
    text-transform: lowercase;
    margin-right: 10px;
}
> h4>.MuiSvgIcon-root{
    font-size: 18px;
    margin-left: 10px;
}

`
const HeaderRight = styled.div`
/* margin-left: auto; */
>p{
    display: flex;
    align-items: center;
    font-size: 14px;
}
>p > .MuiSvgIcon-root{
    margin-right: 5px;
    font-size: 16px;
}


/* align-items: center; */
`
const Header = styled.div`
display: flex;
justify-content: space-between;
border:1px solid lightgray;
padding: 20px;
`
const ChatMessages = styled.div`
margin-bottom: 170px;
`
const BottomChat = styled.div`
`