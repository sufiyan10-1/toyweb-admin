import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

const NavBar = () => {
  return (
    <div className='fixed w-full bg-white border-b py-3'>
      <div className=" w-3 bg-black rounded-r-2xl "><SidebarTrigger /></div> 
      <div>
        
      </div>
    </div>
  );
};

export default NavBar;