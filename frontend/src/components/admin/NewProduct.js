import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar.js'
import {useDispatch, useSelector} from 'react-redux'
import {clearErrors,createProduct} from '../../actions/productAction'
import {useAlert} from 'react-alert';
import {Button} from '@material-ui/core'
import MetaData from '../MetaData'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import DescriptionIcon from '@material-ui/icons/Description'
import StorageIcon from '@material-ui/icons/Storage'
import SpellcheckIcon from '@material-ui/icons/Spellcheck'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

import { NEW_PRODUCT_REQUEST, NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';
import './NewProduct.css'

export default function NewProduct() {
const dispatch=useDispatch();
const alert=useAlert();
const {loading,error,success}=useSelector((state)=>state.newProduct);
const [name,setName]=useState("");
const [price,setPrice]=useState("");
const [description,setDescription]=useState("");
const [category,setCategory]=useState("");
const [stock,setStock]=useState(0);
const [images,setImages]=useState([]);
const [ImagePreview,setImagePreview]=useState([]);

const Navigate=useNavigate();
    const categories=[
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
        "Earbuds"
        ];

     useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      if(success){
        alert.success("Product Created SuccessFully");
        Navigate('/admin/dashboard');
        dispatch({type:NEW_PRODUCT_RESET})
      }
     },[dispatch,alert,error,Navigate,success])
     const createProductSubmitHandler=(e)=>{
        e.preventDefault();
        const myform =new FormData();
        myform.set("name",name);
        myform.set("price",price);
        myform.set("description",description);
        myform.set("category",category);
        myform.set("stock",stock);
        images.forEach(image => {
            myform.append("images",image)
        });
        dispatch(createProduct(myform));
     }   
     const createProductImagesChange=(e)=>{
        const files=Array.from(e.target.files)
        setImages([]);
        setImagePreview([]);
        files.forEach((file)=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImagePreview((old)=>[...old,reader.result]);
                    setImages((old)=>[...old,reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
     }
  return (
    <>
    <MetaData title="Create Product"/>
    <div className='dashboard'>
<Sidebar/>
<div className='newProductContainer'>
<form className='createProductForm' encType='multipart/form-data'>
    <h1>Create Product</h1>
    <div>
        <SpellcheckIcon/>
        <input type='text' placeholder='Product Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
    </div>
    <div>
        <AttachMoneyIcon/>
        <input type='Number' placeholder='Price' required value={price} onChange={(e)=>setPrice(e.target.value)}/>
    </div>
    <div>
        <DescriptionIcon/>
        <textarea  placeholder='Description' required value={description} onChange={(e)=>setDescription(e.target.value) } cols="20" rows="3"></textarea>
    </div>
    <div>
        <AccountTreeIcon/>
        <select onChange={(e)=>setCategory(e.target.value)}>
            <option value="">Choose Category</option>
            {categories.map((cate)=>(
                <option key={cate} value={cate}>
                    {cate}
                </option>
            ))}
        </select>
    </div>
    <div>
        <StorageIcon/>
        <input type='number' placeholder='Stock' required onChange={(e)=>setStock(e.target.value)}/>
    </div>
    <div id="createProductFormFile">
        <input type='file' name='avatar' accept='image/*' 
        onChange={createProductImagesChange} multiple />
    </div>
    <div id="createProductFormImage">
        {ImagePreview.map((image,index)=>(
            <img key={index} src={image} alt='Product Preview'/>
        ))}
    </div>
<Button
onClick={createProductSubmitHandler}
  id="createProductBtn"
  type="submit" disabled={loading?true:false}>  
Create
</Button>
</form>
</div>
    </div>
    </>
  )
}
