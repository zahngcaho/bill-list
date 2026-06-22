import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const billStore = createSlice({
  initialState: {
    bills: []
  },
  name: "billStore",
  reducers: {
    setBillList(state, action) {
      state.bills = action.payload
    },
    addBill(state, action) {
      state.bills.push(action.payload)
    }
  }
})

// async thunk
const getBillList = () => {
  return async (dispatch) => {
    axios.get("http://localhost:8888/ka").then(res => {
      dispatch(setBillList(res.data))
    })
  }
}

const addBillList = (data) => {
  return async (dispatch) => {
    axios.post("http://localhost:8888/ka", data).then(res => {
      dispatch(addBill(res.data))
    })
  }
}

const { setBillList, addBill } = billStore.actions

export { getBillList, addBillList }

const reducer = billStore.reducer

export default reducer