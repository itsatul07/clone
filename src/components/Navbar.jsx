export default function Navbar() {
  return (
    <nav className="navbar ">
     <div className="w-full flex flex-row   justify-between items-center text-gray-900 px-10 py-5"> 
        <p className="text-xl">Pallet Rose</p>
      <ul className="nav-links text-xs flex flex-row gap-7 justify-between">
        <li><a href="/">Get Started</a></li>
        <li><a href="/CreateStrategy">Create Strategy</a></li>
        <li><a href="/pricing">Pricing</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/Solution">Solution</a></li>
        <li><a href="/E-Commerce">E-Commerce</a></li>
        <li><a href="/signup"><img src="..\src\assets\profile.png" width="24" height="24" alt="profile" /></a></li>
        <li><a href="/setting"><img src="..\src\assets\setting.png" width="24" height="24" alt="setting" /></a></li>
      </ul></div>
    </nav>
  );
}