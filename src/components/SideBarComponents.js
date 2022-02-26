// import  from 'syled'
// import { Icon } from '@mui/material';
import styled from 'styled-components'
import { db } from '../firebaseFile.js';
import { collection,addDoc,getDocs } from 'firebase/firestore/lite';
import { useDispatch } from 'react-redux';
import { appSliceActions } from '../features/appSlice.js';
const SidebarOptionalContainer=({Icon,title,add,id,UpdateSnapShot})=>{

    const dispatch=useDispatch();

    console.log( "Add ",add);
    const addData= async (data)=>{
        const path =collection(db,"rooms")
        const docId= await  addDoc( path,{name:data})
        let docs_snap=[];

        const docs= await getDocs(path)
        console.log(docs);
        docs._docs.map((ele)=>{
            const doc={
                id:ele.id,
                name:ele._document.data.value.mapValue.fields.name.stringValue,
            }
            // console.log(doc);
            docs_snap.push(doc)

        })
        UpdateSnapShot(docs_snap)

        return docId

    }
    const addChannel=()=>{
        

        const channelName=prompt("Please Enter The Channel Name");

        if(channelName)
        {
            addData(channelName).then((id)=>{
                 return id.id
            }).then((id)=>{
                console.log("Real ID : ",id);
            }).catch((err)=>{
                console.log(err);
            })

        }
        else{

        }

    }
    const selectChannel=()=>{
        if(id)
        {
            const data={
                roomId:id
            }
            dispatch(appSliceActions.enterRoom(data))

        }
        
    }

    return (
        <SidebarOptionContainer
        onClick={(add)?addChannel:selectChannel}
        >
            {Icon && <Icon fontSize='small' stye={{padding:10}}/>}
            {(Icon)?
            (
                <h3>{title}</h3>
            )
        :
        (
            <SidebarOptionalChannel>
                <span>
                    #
                </span>
                {title}
            </SidebarOptionalChannel>

        )
        }


        </SidebarOptionContainer>
    )
    
}
export default SidebarOptionalContainer;
const SidebarOptionContainer=styled.div`
/* margin-left:200px */
display: flex;
font-size: 12px;
align-items: center;
padding-left: 2px;

cursor: pointer;
:hover{
    opacity: 0.9;
}
> h3{
    font-weight:500 ;
}
 > h3 >span {
     padding: 15px ;
 }

`
const SidebarOptionalChannel=styled.h3`
font-weight:300;
padding:10px 0px;
`