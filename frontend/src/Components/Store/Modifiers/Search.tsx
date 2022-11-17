import React from 'react'
import { Input } from 'antd'
import { useAppDispatch } from '../../../Redux/Hook'
import { changeModifiers } from '../../../Redux/Slices/CommonSlice'


const Search = () => {

    const dispatch = useAppDispatch()

    const onSearch = (value: string) => {
        dispatch(changeModifiers({ search: value }))
    }

    return (
        <Input.Search className='tw-col-span-2 md:tw-col-span-4 lg:tw-w-1/2' placeholder="Search Products here..." onSearch={onSearch} enterButton />
    )
}

export default Search