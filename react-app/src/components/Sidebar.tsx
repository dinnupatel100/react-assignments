import '../stylesheets/Sidebar.css'

const Sidebar = () => {
  return(
    <div className="sidebar">
    <h2>Sidebar</h2>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
  )
}

export default Sidebar;