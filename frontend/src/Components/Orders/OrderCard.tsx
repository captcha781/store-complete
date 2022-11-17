import { ClockCircleFilled } from '@ant-design/icons'
import { AttachMoney } from '@mui/icons-material'
import { Statistic } from 'antd'
import React from 'react'
import { OrderItem } from '../../types'

interface Props {
    order: OrderItem
}

const OrderCard = ({order}:Props) => {
  return (
    <div className='tw-w-full tw-p-4 tw-bg-white tw-shadow-lg tw-shadow-gray-300 tw-rounded'>
        <div className='tw-flex tw-items-start tw-justify-between md:tw-items-center tw-flex-col md:tw-flex-row'>
            <div className='tw-text-slate-800 tw-mb-4 tw-font-outfit'>Order ID: {order._id}</div>
            <div className='tw-flex tw-items-center tw-gap-x-2 md:tw-gap-x-4'><ClockCircleFilled/> in {order.deliverIn}</div>
        </div>
        <div className='tw-flex tw-justify-center tw-items-center tw-mb-4'>
            <div className='tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-8 xl:tw-grid-cols-12 tw-w-full'>
                {order.products.map(item => (
                    <div key={item.product._id} className='tw-w-20 tw-col-span-1 tw-flex tw-justify-center tw-items-center'><img src={item.product.thumbnail} alt={item.product.title} /></div>
                ))}
            </div>
        </div>
        <div className='tw-flex tw-w-full tw-flex-col md:tw-flex-row tw-justify-start md:tw-justify-between tw-items-center '>
            <div className='tw-p-3 tw-w-full'>
                <h4>Deliver To:</h4>
                <p className='tw-mb-0'>{order.address.buildingNo}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.pincode}. </p>
            </div>
            <div className='tw-flex tw-items-center tw-gap-1 tw-rounded tw-bg-slate-200 tw-px-3 tw-py-1.5 tw-w-fit'><AttachMoney sx={{fontSize: 22}} /><Statistic value={order.payableAmount} /></div>
        </div>
    </div>
  )
}

export default OrderCard