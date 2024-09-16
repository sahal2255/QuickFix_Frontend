import React,{useEffect,useState} from "react";
import CommonTable from "../../common/CommonTable";
import { Label } from "@mui/icons-material";
import { FetchUser } from "../../../services/admin/FetchUser";

export default function UserList(){

    const [users,setUsers]=useState([])

    useEffect(()=>{
        const loadUser=async()=>{
            try{
                const fetchUser=await FetchUser()
                setUsers(fetchUser)
            }catch(error){
                console.error('failed fetch user',error)
            }
        }
        loadUser()
    },[])

    const userColumns=[
        {id:'userName',label:'User Name'},
        {id:'email',label:'Email'},
        {id:'phoneNumber',label:'Phone Number'},
        {id:'action',label:'Actions',align:'center'},

    ]
    return(
        <div>
            <CommonTable columns={userColumns} rows={users} />
        </div>
    )
}