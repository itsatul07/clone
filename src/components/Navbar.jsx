// src/components/Navbar.jsx
import React, { forwardRef } from 'react';

// Import your images at the top of the file
import profileIcon from '../assets/profile.png';
import settingIcon from '../assets/setting.png';

// 1. Wrap the component definition in forwardRef
const Navbar = forwardRef((props, ref) => {
  return (
    // 2. Attach the ref to the main <nav> element
    <nav ref={ref} className="navbar">
      <div className="w-full flex flex-row justify-between items-center text-gray-900 px-10 py-5">
        <p className="text-xl">Pallet Rose</p>
        <ul className="nav-links text-xs flex flex-row gap-7 justify-between items-center">
          <li><a href="/">Get Started</a></li>
          <li><a href="/CreateStrategy">Create Strategy</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/Solution">Solution</a></li>
          <li><a href="/E-Commerce">E-Commerce</a></li>
          {/* 3. Use the imported variables for the image sources */}
          <li><a href="/signup"><img src={profileIcon} width="24" height="24" alt="profile" /></a></li>
          <li><a href="/setting"><img src={settingIcon} width="24" height="24" alt="setting" /></a></li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;