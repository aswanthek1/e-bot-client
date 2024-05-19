import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header'
import TeamsTable from '../../components/TeamsTable/TeamsTable';
import { getSession } from '../../../utils/common.utils';
import axios from 'axios';
import { config } from '../../../config/config';
const {BACKEND_BASE_URL} = config

const Home = () => {
    const[userData, setUserData] = useState({})
    const {token} = getSession()
    useEffect(() => {
        fetchUserById()
    },[])
    const fetchUserById = async() => {
        try {
            const { data } = await axios.get(`${BACKEND_BASE_URL}/user/authenticate`, { headers: { 'authorization': token } })
            console.log(data)
            setUserData(data?.user)
        }catch(error) {
            console.log(error)
        }
    }
    return(
        <>
        <Header/>
        <TeamsTable userData={userData} fetchUserById={fetchUserById}/>
        </>
    )
}

export default Home;