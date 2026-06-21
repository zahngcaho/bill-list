import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"

const Layout = () => {
  return (
    <div>
      我是layout
      <Outlet />
      <div><Button color='primary'>全局</Button></div>
      <div className="purple"><Button color='primary'>局部</Button></div>
    </div>
  )
}

export default Layout