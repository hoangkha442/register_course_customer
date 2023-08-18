import React, { useState } from 'react'
import { HomeOutlined , BorderOuterOutlined, FolderOpenOutlined, PlayCircleOutlined, PayCircleOutlined, WechatOutlined, ExclamationCircleOutlined, UnorderedListOutlined, CreditCardOutlined, DownOutlined  } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
const items = [
  {
    label: <NavLink to='/'><span className='text-[15px] font-[500] tracking-wider text-[#585757]'>Home</span></NavLink>,
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
const pages = [
  {
    label: <span className='text-[15px] font-[500] tracking-wider text-[#585757]'>Pricing</span>,
    key: 'Pricing',
    icon: <div className="rounded-md w-8 h-8 text-2xl justify-center"><CreditCardOutlined  style={{fontSize: '18px', textAlign: 'center'}} className='text-[#585757] font-bold' /></div>,
  },
  {
    label: <span className='text-[15px] font-[500] tracking-wider] text-[#585757]'>Help</span>,
    key: 'Help',
    icon: <div className="rounded-md w-8 h-8 text-2xl justify-center"><ExclamationCircleOutlined  style={{fontSize: '18px', textAlign: 'center'}} className='text-[#585757' /></div>,
  },
  {
    label: <span className='text-[15px] font-[500] tracking-wider] text-[#585757]'>Faq</span>,
    key: 'Faq',
    icon: <div className="rounded-md w-8 h-8 text-2xl justify-center"><FolderOpenOutlined style={{fontSize: '18px', textAlign: 'center'}} className='text-[#585757]' /></div>,
  },
  {
    label: <div className="flex justify-between items-center w-full">
      <span className='text-[15px] font-[500] tracking-wider] text-[#585757]'>Forum</span>
      <span className='text-[#11b981] bg-[#d1fae5] text-xs font-[500] px-2 py-1 rounded-3xl'>New</span>
      </div>,
    key: 'Forum',
    icon: <div className="rounded-md w-8 h-8 text-2xl justify-center"><WechatOutlined  style={{fontSize: '18px', textAlign: 'center'}} className='text-[#585757]' /></div>,
  },
  {
    label: <span className='text-[15px] font-[500] tracking-wider] text-[#585757]'>Cart list</span>,
    key: 'CartList',
    icon: <div className="rounded-md w-8 h-8 text-2xl justify-center"><UnorderedListOutlined  style={{fontSize: '18px', textAlign: 'center'}} className='text-[#585757]' /></div>,
  },
  {
    label: <span className='text-[15px] font-[500] tracking-wider] text-[#585757]'>Payments</span>,
    key: 'Payments',
    icon: <div className="rounded-md w-8 h-8 text-2xl justify-center"><PayCircleOutlined style={{fontSize: '18px', textAlign: 'center'}} className='text-[#585757]' /></div>,
  }

];
export default function NavBar() {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className="px-5 bg-white">
      <div className='mt-3 top-0  h-screen bg-white'>
        <Menu className='my-2 bg-white' onClick={onClick} selectedKeys={[current]} items={items} />
        <div className="border-t" id='menu-2'>
          <div className="pl-2">
            <p className='text-[#333333] mt-3 text-xl font-semibold'>Pages</p>
            <Menu className='my-2 bg-white' items={pages}/>
          </div>
        </div>
        <div className="border-t">
          <div className="pl-2">
            <div className="flex items-center justify-between flex-wrap mt-3 cursor-pointer">
              <p className='text-[#585757] text-base font-semibold'>Development</p> 
              <span> <DownOutlined  style={{fontSize: '14px', textAlign: 'center'}} className='text-[#585757] font-bold'/></span>
            </div>
            <div className="flex items-center justify-between flex-wrap mt-3 cursor-pointer">
              <p className='text-[#585757] text-base font-semibold'>Authentication</p>
              <DownOutlined  style={{fontSize: '14px', textAlign: 'center'}} className='text-[#585757] font-bold'/>
            </div>
          </div>
        </div>
        <div class="side_foot_links text-xs pt-5">
          <ul className='flex flex-wrap'>
            <li className='pr-2'><a href=""> About</a></li>
            <li className='pr-2'><a href=""> Blog</a></li>
            <li className='pr-2'><a href=""> Careers</a></li>
            <li className='pr-2'><a href=""> Support</a></li>
            <li className='pr-2'><a href=""> Contact Us </a></li>
            <li className='pr-2'><a href=""> Developer</a></li>
            <li className='pr-2'><a href=""> Terms of service</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
