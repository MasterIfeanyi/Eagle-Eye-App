import { Bell, Menu, } from "lucide-react"


const Header = () => {


  return (
    <header className="bg-dark text-white p-3 shadow" style={{
      position: "sticky",
      top: 0, 
      zIndex: 1000,
    }}>
      <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            {/* <Shield size={24} /> */}
            <img src="./eagle.png" style={{width: "20px", height: "30px"}} alt="" />
            <h1 className="h5 mb-0 fw-bold">Eagle Eye</h1>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Bell size={20} />
            <Menu size={20} />
          </div>
      </div>
    </header>
  )
}

export default Header