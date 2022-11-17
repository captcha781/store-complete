import { ArrowBack, ShareRounded, Star } from '@mui/icons-material'
import { Rating } from '@mui/material'
import { Stack } from '@mui/system'
import { Button, message, Statistic } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Product } from '../../types'

const DetailComponent = () => {

    const params = useParams()
    const [product, setProduct] = useState<Product>()
    document.title = "KeyStone | " + params?.id
    useEffect(() => {
        axios.get("/product/specificproduct/" + params.id)
            .then(response => {
                setProduct(response.data.product)
            })
            .catch(err => {
                message.error(err.message)
            })
    }, [params.id])
    localStorage.removeItem("entryurl")

    return (
        <div className='tw-w-full'>
            <div className='tw-flex tw-justify-between tw-items-center tw-w-full tw-p-3'>
                <Link to={"/"}><ArrowBack /></Link>
                <div><ShareRounded /></div>
            </div>
            {product && <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-mt-5 tw-gap-5'>
                <div className='tw-w-full tw-col-span-1'><img src={product?.thumbnail} alt={product?.title} /></div>
                <div className='tw-w-full tw-col-span-1 tw-p-3'>
                    <Stack direction={"column"} rowGap={2}>
                        <h1 className='tw-mb-0'>{product?.title}</h1>
                        <h5 className='tw-mb-0 tw-text-gray-600'>{product?.description}</h5>
                        <h3 className='tw-mb-0'><Statistic className='tw-font-outfit tw-font-bold' prefix={"$ "} value={product?.price} /></h3>
                        <p className='tw-px-2 tw-py-1 tw-mb-0 tw-bg-gray-300 tw-rounded-md tw-text-slate-500 tw-w-fit'>No discounts at this time.</p>
                        <Rating readOnly emptyIcon={<Star />} value={product?.rating} precision={0.5} />
                        <Button type='primary'>Add to Cart</Button>
                    </Stack>
                </div>
            </div>}
            {!product && <h1>No Product Found</h1>}
        </div>
    )
}

export default DetailComponent