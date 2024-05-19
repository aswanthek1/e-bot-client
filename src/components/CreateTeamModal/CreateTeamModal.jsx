import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import './CreateTeamModal.css'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { config } from '../../../config/config';
import { logout } from '../../../utils/common.utils';
const { BACKEND_BASE_URL } = config

const CreateTeamModal = ({ show, onClose, formData=null, fetchTeamData=()=>null }) => {
    const [teamState, setTeamState] = useState({
        team_name: formData?.team_name ? formData?.team_name : '',
        total_members: formData?.total_members ? formData?.total_members : 0,
        total_wins: formData?.total_wins ? formData?.total_wins : 0,
        total_lose: formData?.total_lose ? formData?.total_lose : 0
    })
    console.log(teamState, 'teamState')
    useEffect(() => {
        setTeamState({
            team_name: formData?.team_name ? formData?.team_name : '',
            total_members: formData?.total_members ? formData?.total_members : 0,
            total_wins: formData?.total_wins ? formData?.total_wins : 0,
            total_lose: formData?.total_lose ? formData?.total_lose : 0
        })
    },[formData])
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')

        try {
            if(formData) {
                // update team
                const { data } = await Axios.put(`${BACKEND_BASE_URL}/team/edit-team/${formData?._id}`, teamState,
                    {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }
                )
                alert("Team Updated Successfully!")
            }
            else {
                // create team
                const { data } = await Axios.post(`${BACKEND_BASE_URL}/team/create-team`, teamState,
                    {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }
                )
                setTeamState({
                    team_name: '',
                    total_members: 0,
                    total_wins: 0,
                    total_lose: 0
                })
                alert("Team Created Successfully!")
            }
            onClose()
            fetchTeamData()
        } catch (error) {
            console.log(error, 'error')
            alert(error.response?.data?.message || 'Something went wrong!')
            if(error?.response?.status === 403) {
                logout()
                // navigate('/login')
                window.location.reload()
            }
        }
    };
    const handleChange = (event) => {
        setTeamState({ ...teamState, [event.target.name]: event.target.value })
    }
    return (
        <Modal onClose={onClose} show={show}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="team_name">Team Name</label>
                    <input onChange={handleChange} value={teamState.team_name} type="text" id="team_name" name="team_name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="total_members">Number of Players</label>
                    <input onChange={handleChange} value={teamState.total_members} type="number" min={0} id="total_members" name="total_members" required />
                </div>
                <div className="form-group">
                    <label htmlFor="input3">Total Wins</label>
                    <input onChange={handleChange} value={teamState.total_wins} type="number" min={formData?.total_wins ? formData?.total_wins : 0} id="total_wins" name="total_wins" />
                </div>
                <div className="form-group">
                    <label htmlFor="input3">Total Lose</label>
                    <input onChange={handleChange} value={teamState.total_lose} type="number" min={teamState?.total_lose ? teamState?.total_lose : 0} id="total_lose" name="total_lose" />
                </div>
                <div className='team-actions' >
                    <button type="submit" className='btn btn-primary w-100'>Submit</button>
                    <button type='button' className="btn btn-danger w-100" onClick={onClose}>Close</button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateTeamModal;