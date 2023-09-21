import React from 'react'
import { resetCart } from '@/store/nextSlice'
import {useDispatch} from "react-redux"

const ResetCart = () => {

    const dispatch = useDispatch()

  const handleReset = () =>{
    const confirmReset = window.confirm(
      `Are you sure to reset your items form the cart?`
    )
    if(confirmReset)  dispatch(resetCart())
  }

  return (
    <button className='w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300 my-3' onClick={handleReset}>Reset cart</button>
  )
}

export default ResetCart