import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState, useMemo } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import dayjs from 'dayjs'
const Month = () => {
  // 按月做数据的分组
  const bills = useSelector(state => state.bill.bills)
  const monthGroup = useMemo(() => {
    return _.groupBy(bills, (item) => dayjs(item.date).format('YYYY-MM'))
  }, [bills])
  console.log('账单按月分组', monthGroup)
  // 时间选择器
  const [dateVisible, setDateVisible] = useState(false)
  // 当前时间
  const [currentDate, setCurrentDate] = useState(() => {
    return new Date()
  })
  const [currentMonthList, setMonthList] = useState([])
  const monthResult = useMemo(() => {
    //支出    收入    结余
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentMonthList])
  // 时间选择器确认回调
  const onConfirm = (date) => {
    const formatDate = dayjs(date).format('YYYY-MM')
    console.log(formatDate)
    setMonthList(monthGroup[formatDate] || [])
    setCurrentDate(date)
    setDateVisible(false)
  }
  console.log('当前月账单', currentMonthList)

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentDate.getFullYear()} | {currentDate.getMonth() + 1}月账单
              {/* 2023 | 3月账单 */}
            </span>
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month