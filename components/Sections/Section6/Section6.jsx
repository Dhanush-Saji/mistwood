'use client'
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Section6 = () => {
  const [isLoading, setisLoading] = useState(false)
  const [formData, setformData] = useState({name:'',email:'',message:''})
  const sendMsg = async() => {
    if(!formData?.email || !formData?.message || !formData?.name){
      toast.error('Fill all the fields')
      return
    }
    setisLoading(true)
       try {
        emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,formData,process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_USER_ID).then((response)=>{
          setformData({name:'',email:'',message:''})
          setisLoading(false)
        }).catch((error)=>{
          console.log(error.message);
          setisLoading(false)
        })
        // const res = await enquiryEmail(formData)
        // if(res?.status){
        //   toast.success(res?.message)
        // }
        // console.log(res);
       } catch (error) {
        console.log(error.message);
       }finally{
       }
  };
  return (
    <div
      className="sixth-section bg-[#ecedef] w-screen h-screen py-10 px-5 md:px-32 relative"
    >
      <div className="mt-10">
        <span className="text-5xl md:text-5xl font-extrabold">
          Love to here from you, <br />
          Get in touch👋
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          <div className="flex flex-col gap-2">
            <label for="">Your name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="px-5 py-2 rounded-md" value={formData?.name} onChange={(e)=>setformData({...formData, name: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="">Your email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="px-5 py-2 rounded-md" value={formData?.email} onChange={(e)=>setformData({...formData, email: e.target.value})}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label for="">Your message</label>
          <textarea
            placeholder="Enter message"
            name=""
            id=""
            cols="8"
            rows="8"
            className="px-5 py-2 rounded-md" value={formData?.message} onChange={(e)=>setformData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={sendMsg} className='w-full md:w-fit min-w-24' disabled={isLoading}>
            {isLoading?<>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>:'Send Message'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Section6;
