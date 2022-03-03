import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />Register
                </h1>
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