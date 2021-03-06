import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message, user } = useSelector((state) => state.auth)

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate('/')
        }
        dispatch(reset())
    }, [message, user, isSuccess, isError, isLoading, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = { email, password }
        dispatch(login(payload))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Enter email'
                            className='form-control'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Enter password'
                            className='form-control'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login