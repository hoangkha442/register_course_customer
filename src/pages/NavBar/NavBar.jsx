import React, { useState } from 'react'
import { HomeOutlined , BorderOuterOutlined, FolderOpenOutlined, PlayCircleOutlined  } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
const items = [
  {
    label: <span className='text-[15px] font-[500] tracking-wider text-[#585757]'>Home</span>,
    key: 'mail',
    icon: <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#c4b5fd] to-[#3b82f6] text-2xl justify-center"><HomeOutlined style={{fontSize: '16px', textAlign: 'center'}} className='text-white' /></div>,
  },
  {
    label: <span className='text-[15px] font-[500] tracking-wider] text-[#585757]'>Courses</span>,
    key: 'Courses',
    icon: <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] text-2xl justify-center"><PlayCircleOutlined style={{fontSize: '18px', textAlign: 'center'}} className='text-white' /></div>,
  },
  {
    label: <span className='text-[15px] font-[500] tracking-wider] text-[#585757]'>Categories</span>,
    key: 'Categories',
    icon: <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#6ee7b7] to-[#10b981] text-2xl justify-center"><FolderOpenOutlined style={{fontSize: '18px', textAlign: 'center'}} className='text-white' /></div>,
  },
  {
    label: <span className='text-[15px] font-[500] tracking-wider] text-[#585757]'>Route</span>,
    key: 'Route',
    icon: <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#f9a8d4] to-[#ef4444] text-2xl justify-center"><BorderOuterOutlined style={{fontSize: '18px', textAlign: 'center'}} className='text-white' /></div>,
  }
];
export default function NavBar() {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className="pl-8">
      <div className='mt-5 top-0  h-screen'>
        <Menu className='my-2 bg-[#f9fafb]' onClick={onClick} selectedKeys={[current]} items={items} />
      </div>
    </div>
  )
}
