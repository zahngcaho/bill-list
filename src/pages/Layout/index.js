import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "@/store/modules/billStore"
const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  },[dispatch])
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