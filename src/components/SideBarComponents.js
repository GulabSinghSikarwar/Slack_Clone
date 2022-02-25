// import  from 'syled'
// import { Icon } from '@mui/material';
import styled from 'styled-components'
import { db } from '../firebaseFile.js';
import { collection,addDoc } from 'firebase/firestore/lite';
const SidebarOptionalContainer=({Icon,title,add})=>{

    console.log( "Add ",add);
    const addData= async (data)=>{
        const path =collection(db,"rooms")
        const docId= await  addDoc( path,{name:data})

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
const SidebarOptionalChannel=styled.div``