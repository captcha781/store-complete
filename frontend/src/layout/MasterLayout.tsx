import React from 'react'
import AppFooter from '../Components/AppFooter'
import AppHeader from '../Components/AppHeader'
import AppSidebar from '../Components/AppSidebar'
import Wrapper from '../Components/Wrappers/Wrapper'
import MainRoute from "../Pages/MainRoute"

const MasterLayout = () => {
    return (
        <div>
            <AppSidebar />
            <Wrapper>
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <MainRoute />
                </div>
                <AppFooter />
            </Wrapper>
        </div>
    )
}

export default MasterLayout