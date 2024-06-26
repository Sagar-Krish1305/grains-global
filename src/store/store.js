import {configureStore} from "@reduxjs/toolkit"
import authslice from "./AuthSlice"

const store = configureStore({
    reducer:{
        auth : authslice
    }
})

export default store