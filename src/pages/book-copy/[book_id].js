/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
export default function BookCopy(){
    const router = useRouter();
    const {book_id} = router.query;
    const [copyData,setCopyData] = useState([])
    const [status,setStatus] = useState(false);
    const [loading,setLoading] = useState(true);
    const [isAdmin,setIsAdmin] = useState(false);
    useEffect(()=>{
        
        async function checkSession(){
          
            const sess = await getSession();
          //   console.log(sess.user.isAdmin,"session");
            if(sess === null){
                await router.push("/api/auth/signin");
                // console.log(status,"status")
            }else{
                if(sess.user.isAdmin === 'true')
                {
                  setIsAdmin(true);
                  setLoading(false);   
                  // console.log(loading,isAdmin) 
                }
                setStatus(true);
                setLoading(false);
              //   console.log(loading,isAdmin) 
            }
          }

        async function getCopyData(){
            const apiUrlEndpoint = `/api/get-copy-data/${book_id}`
            
            const response = await fetch(apiUrlEndpoint);
            const res = await response.json();
            console.log(res,"res");
            if(res.values){
                if(res.values.length>0){
                    await setCopyData(res.values);
                    setLoading(false);
                }
            }else{
                console.log("loading");
            }
        }
        checkSession();
        getCopyData();
    },[status])

    // if(status && copyData){
    //     if(copyData.length!=0)
    //     return <Sidebar DATA={copyData} type="book-copy" search={false}/>
    // }else{
    //     return null;
    // }
    return(
        <>
        {loading?"Loading":<Sidebar DATA={copyData} type="book-copy" search={false} setLoading={setLoading} isAdmin={isAdmin}/>}
        </>
    )
}