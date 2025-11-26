import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { googleLogout } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose
} from "@/components/ui/dialog";

import { X } from "lucide-react"

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));

  const [openDialog, setOpenDialog] = useState(false);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    console.log(user);
    setAdmin(user)
  },[]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })

  }

  return (
    <div className='p-2 shadow-lg flex justify-between items-center px-5'
      style={{ zIndex: 2 }}
    >
    
      <a href='/'><strong><img height={150} width={150} src="/n logo.PNG" alt="" /></strong>  </a>
      <div>
        {user ?

          <div className='flex items-center gap-3'>

            <a href="/create-trip">
              <Button variant="outline" className="bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545] rounded-full">+ Create Trip</Button>
            </a>


            <a href="/my-trips">
              <Button variant="outline" className="bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545] rounded-full">My Trips</Button>
            </a>

              <a href="/add-log">
              <Button variant="outline" className="bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545] rounded-full">Add Travel Log</Button>
            </a>
              <a href="/view-logs">
              <Button variant="outline" className="bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545] rounded-full">View Travel Log</Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className=" h-[35px] w-[35px] rounded-full" />
              </PopoverTrigger>
              <PopoverContent className="bg-white">
                <h2 className="cursor-pointer" onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Log Out</h2>
              </PopoverContent>
            </Popover>

          </div>

          :

          <Button onClick={() => setOpenDialog(true)} className='bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'>Sign In</Button>

        }

        <Dialog open={openDialog}>
          <DialogContent setOpenDialog={setOpenDialog}>
            <DialogHeader>
              <DialogDescription>
                <h4 className='underline font-bold text-xl tracking-wide text-indigo-950'>Wander Guide</h4>

                <DialogClose onClick={() => {
                  console.log('Closing dialog');
                  setOpenDialog(false);
                }} className="px-4 absolute right-4 top-4 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:ring-1 hover:ring-[#c2cbff] focus:outline-none focus:ring-ring focus:ring-offset-3 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  
                  <X className="h-4 w-4" />
                
                </DialogClose>
                
                <h2 className='font-bold text-lg mt-5'>Continue with Google Authentication</h2>

                <Button
                  onClick={login}
                  className="w-full mt-5 bg-[#462F26] text-white hover:border-[#291813] flex gap-2 items-center">

                  <FcGoogle className="w-6" />
                  Sign In With Google

                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}

export default Header