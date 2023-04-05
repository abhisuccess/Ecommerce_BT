import React, { useEffect } from 'react'
import './OrderDetails.css'
import {useSelector,useDispatch} from 'react-redux'
import MetaData from '../MetaData';
import {Link, useParams} from 'react-router-dom'
import {Typography} from '@material-ui/core'
import {getOrderDetails,clearErrors} from '../../actions/orderAction'
import Loder from '../loder/Loder'
import {useAlert} from 'react-alert'
export default function OrderDetails() {
    const {order,error,loading}=useSelector((state)=>state.orderDetails);
    const dispatch=useDispatch();
    const alert=useAlert();
    const params=useParams();
    useEffect(()=>{
       
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id))
    },[dispatch,alert,error,params.id])
  return (
    <>
    {loading?<Loder/>:<>
     
     <MetaData title="Order Details"/>
     <div className='orderDetailsPage'>
        <div className='orderDetailsContainer'>
            <Typography component="h1">
                Order #{order && order._id}
            </Typography>
                <Typography>Shipping Info</Typography>
            <div className='orderDetailsContainerBox'>
             <div>
                <p>Name:</p>
                <span>{order.user && order.user.name}</span>
             </div>
             <div>
                <p>Phone:</p>
                <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                </span>
             </div>
             <div>
                <p>Address</p>
                <span>
                    {order.shippingInfo && `${order.shippingInfo.address} ,${order.shippingInfo.city},
                    ${order.shippingInfo.state},${order.shippingInfo.pincode},${order.shippingInfo.country}`}
                </span>
             </div>

            </div>
            <Typography>Payment</Typography>
            <div className='orderDetailsContainerBox'>
                <div>
                    <p className={order.paymentInfo && order.paymentInfo.status==="succeeded"?"GreenColor":"RedColor"}>
                    {order.paymentInfo && order.paymentInfo.status==="succeeded"?"Paid":"Not Paid"}
                    </p>
                </div>
                <div>
                    <p>Amount</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                </div>
            </div>
            <Typography>Order Status</Typography>
            <div className='orderDetailsContainerBox'>
                <div>
                    <p className={order.orderStatus && order.orderStatus==="Delivered"?"GreenColor":"RedColor"}
                    >{order.orderStatus && order.orderStatus}</p>
                </div>
            </div>
        </div>
    <div className='orderDetailsCartItems'>
<Typography>Order Items</Typography>
<div className='orderDetailsCartItemsContainer'>
{order.orderItem && order.orderItem.map((item)=>(
    <div key={item.product}>
        <img src={item.image} alt="Product"/>
        <Link to={`/product/${item.product}`}>{item.name} </Link>
        <span>
            {item.quantity} X Rs {item.price}= <b>RS {item.price*item.quantity}</b>
        </span>
    </div>
))}
</div>
    </div>
     </div>
    </>}
    </>
  )
}
