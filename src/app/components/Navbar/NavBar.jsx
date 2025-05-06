import React from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

const NavBar = () => {
  return (
    <div className='w-full flex justify-center items-center bg-white border-b px-5 py-3'>
        <div className='flex'>
            <Input className={"w-96"}/>
            <Button className={"cursor-pointer"}>Search</Button>
        </div>
    </div>
  );
};

export default NavBar;