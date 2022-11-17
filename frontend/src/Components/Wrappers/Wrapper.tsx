import React, { PropsWithChildren, useEffect } from 'react'
import { useAppState } from '../../Redux/Hook'

const Wrapper = (props: PropsWithChildren) => {
    const sideOpen = useAppState(state => state.common.sidebarShow)

    useEffect(() => {
        if (window.innerWidth > 768) {
            if (sideOpen) {
                const ele = document.getElementById("shrinked-custom") as HTMLDivElement
                ele.style.paddingLeft = "18em"
            }
        } else {
            const ele = document.getElementById("shrinked-custom") as HTMLDivElement
            ele.style.paddingLeft = "0em"
        }

        if(window.innerWidth<768){
            const ele = document.getElementById("shrinked-custom") as HTMLDivElement
            ele.style.paddingLeft = "0em"
        }

    }, [sideOpen])
    return (
        <div className="wrapper d-flex flex-column min-vh-100 bg-light" id='shrinked-custom' style={{ transition: "0.3s padding " }}>
            {props.children}
        </div>
    )
}

export default Wrapper