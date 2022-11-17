import { Button, Checkbox, Popover } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { FormEvent, useState } from 'react'
import { useAppDispatch } from '../../../Redux/Hook';
import { changeModifiers } from '../../../Redux/Slices/CommonSlice';

const Filter = () => {

    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<any>()
    const dispatch = useAppDispatch()

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const onChange = (checkedValues: CheckboxValueType[]) => {
        setValues(checkedValues)
        dispatch(changeModifiers({ category: checkedValues}))
    };

    const options = [
        { label: 'Electronics', value: 'electronics' },
        { label: 'Smartphones', value: 'smartphones' },
        { label: 'Laptops', value: 'laptops' },
        { label: 'Fragrances', value: 'fragrances' },
        { label: 'Skincare', value: 'skincare' },
        { label: 'Groceries', value: 'groceries' },
        { label: 'Home Decoration', value: 'home-decoration' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Dresses', value: 'dress' },
    ];

    const filterHandler = (e:FormEvent) => {
        e.preventDefault()
    }

    const SortContent = () => {
        return (
            <form className='tw-w-60 tw-grid tw-grid-cols-1 tw-gap-1' onSubmit={filterHandler}>
                <div className=' tw-gap-1 tw-align-baseline'>
                    <label>Categories</label><br/>
                    <Checkbox.Group className='tw-grid tw-grid-cols-1' value={values} options={options} onChange={onChange} />
                </div>
                <Button className={'tw-mt-3'} type='primary'>Apply</Button>
            </form>
        )
    }

    return (
        <Popover
            content={<SortContent />}
            title="Filter Products"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement={"bottomRight"}
           className={"tw-col-start-2 tw-row-start-1 md:tw-col-start-auto md:tw-row-start-auto tw-col-span-1 md:tw-col-span-1 "}
        >
            <Button type="ghost">Filters</Button>
        </Popover>
    )
}

export default React.memo(Filter)