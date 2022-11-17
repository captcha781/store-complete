import { ArrowLeft } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppState } from '../../Redux/Hook'
import { changeModifiers } from '../../Redux/Slices/CommonSlice'

const Paginator = () => {

    const count = useAppState(state => state.product.count)
    const page = useAppState(state => state.common.modifiers.page)
    const dispatch = useAppDispatch()
    let maxpages = count % 16 === 0 ? Math.floor(count / 16) : Math.floor((count / 16) + 1)
    let nextpage = page + 1 < maxpages ? page + 1 : maxpages

    return (
        <div className='tw-my-3 tw-w-fit tw-mx-auto tw-text-center tw-py-4 tw-px-3 tw-rounded tw-flex tw-items-baseline tw-gap-x-2'>
            {count > 1 && <>
                {page >1 && <Link to={"/?page=" + (page-1)} onClick={() => dispatch(changeModifiers({page: (page-1)}))} className='tw-w-8 md:tw-w-10 tw-h-8 md:tw-h-10 tw-rounded tw-shadow-lg tw-shadow-gray-300 tw-p-3 tw-bg-white tw-flex tw-justify-center tw-items-center'><ArrowLeft/></Link>}
                <Link to={"/?page=" + page} onClick={() => dispatch(changeModifiers({page: page}))} className='tw-w-8 md:tw-w-10 tw-h-8 md:tw-h-10 tw-rounded tw-shadow-lg tw-shadow-gray-300 tw-p-3 tw-bg-white tw-flex tw-justify-center tw-items-center'>{page}</Link>
                {page !== maxpages && <Link to={"/?page=" + nextpage} onClick={() => dispatch(changeModifiers({page: nextpage}))} className='tw-w-8 md:tw-w-10 tw-h-8 md:tw-h-10 tw-rounded tw-shadow-lg tw-shadow-gray-300 tw-p-3 tw-bg-white tw-flex tw-justify-center tw-items-center'>{nextpage}</Link>}
                <div className=''>...</div>
                <Link to={"/?page=" + { maxpages }} onClick={() => dispatch(changeModifiers({page: maxpages}))} className='tw-w-8 md:tw-w-10 tw-h-8 md:tw-h-10 tw-rounded tw-shadow-lg tw-shadow-gray-300 tw-p-3 tw-bg-white tw-flex tw-justify-center tw-items-center'>{maxpages}</Link>
            </>}
        </div>
    )
}

export default Paginator