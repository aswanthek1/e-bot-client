import axios from "axios";
import { getSession, logout } from "../../../utils/common.utils";
import { config } from "../../../config/config";
import { useEffect, useState } from "react";
import CreateTeamModal from "../CreateTeamModal/CreateTeamModal";
const { BACKEND_BASE_URL } = config


const TeamsTable = ({ userData, fetchUserById = () => null }) => {
    console.log(userData, 'userData')
    const { isAdmin, isLoggedIn, token } = getSession()
    const [teams, setTeams] = useState([])
    const [handleTeamModal, setHandleTeamModal] = useState({ modal: false, data: null })
    useEffect(() => {
        fetchTeamData()
    }, [])
    const fetchTeamData = async () => {
        try {
            const { data } = await axios.get(`${BACKEND_BASE_URL}/team/get-teams`, { headers: { 'authorization': token } })
            setTeams(data?.data)
        } catch (error) {
            if (error?.response?.status === 403) {
                alert("Your session expired. Please login to continue")
                const cleard = logout()
                if (cleard === true) {
                    navigate('/login')
                }
            }
            else {
                alert(error.response?.data?.message || 'Something went wrong!')
            }
        }
    }
    const handleCreateTeam = () => {
        setHandleTeamModal({ modal: true, data: null })
    }
    const handleEdit = (team) => {
        setHandleTeamModal({ modal: true, data: team })
    }
    const handleClose = () => {
        setHandleTeamModal({ modal: false, data: null })
    }
    const handleSubscribe = async (teamId) => {
        try {
            const { data } = await axios.patch(`${BACKEND_BASE_URL}/user/subscribe/${teamId}`, {},
                {
                    headers: {
                        'authorization': token
                    }
                }
            )
            fetchUserById()
            alert(data?.message)
        } catch (error) {
            if (error?.response?.status === 403) {
                alert("Your session expired. Please login to continue")
                const cleard = logout()
                if (cleard === true) {
                    navigate('/login')
                }
                // window.location.reload()
            }
            else {
                alert(error.response?.data?.message || 'Something went wrong!')
            }
        }
    }
    return (
        <div className='px-3 py-5'>
            <div className=" d-flex gap-4 flex-column">
                {
                    teams?.length ? <h1>Teams</h1> : <h2>No Team Created Yet</h2>}
                {
                    isAdmin && isLoggedIn &&
                    <button
                        type='button'
                        style={{ width: 'fit-content', alignSelf: 'flex-end' }}
                        className='btn btn-sm btn-primary'
                        onClick={handleCreateTeam}
                    >Create Team</button>
                }
                {
                    teams?.length ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Team Name</th>
                                    <th scope="col">Total Players</th>
                                    <th scope="col">Total Wins</th>
                                    <th scope="col">Total Lose</th>
                                    <th scope="col">Subscribe</th>
                                    {isAdmin && <th scope="col">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teams?.map((item) => {
                                        return (
                                            <tr key={item?._id}>
                                                <td scope="row">{item?.team_name}</td>
                                                <td>{item?.total_members}</td>
                                                <td>{item?.total_wins}</td>
                                                <td>{item?.total_lose}</td>
                                                <td><button onClick={() => handleSubscribe(item?._id)} className="action-btn btn btn-sm btn-white border border-primary">
                                                    {userData?.subscribed_team?.includes(item?._id) ?
                                                        <i className="bi bi-bookmark-dash"></i>
                                                        : <i className="bi bi-bookmark-plus-fill"></i>
                                                    }
                                                </button></td>
                                                {isAdmin && <td>
                                                    <div className="d-flex gap-3 align-items-center justify-content-center">
                                                        <button onClick={() => handleEdit(item)} className="action-btn btn btn-sm btn-primary"><i className="bi bi-pencil-square"></i></button>
                                                        <button className="action-btn btn btn-sm btn-danger"><i className="bi bi-trash-fill"></i></button>
                                                    </div>
                                                </td>}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        : null}
            </div>
            <CreateTeamModal show={handleTeamModal.modal} onClose={handleClose} formData={handleTeamModal.data} fetchTeamData={fetchTeamData} />
        </div>
    )
}

export default TeamsTable;