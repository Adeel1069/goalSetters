import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData

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

        if (password !== password2) {
            toast.error('Passsword do not match')
        } else {
            const payload = { name, email, password }
            dispatch(register(payload))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1> <FaUser />Register</h1>
                <p>Please create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Enter name'
                            className='form-control'
                            value={name}
                            onChange={onChange}
                        />
                    </div>
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
                        <input
                            type="password"
                            name="password2"
                            id="password2"
                            placeholder='Confirm password'
                            className='form-control'
                            value={password2}
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

export default Register