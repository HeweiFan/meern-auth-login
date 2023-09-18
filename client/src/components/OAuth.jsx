
import React from 'react'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'

const OAuth = () => {

    const dispatch = useDispatch()
    const handleClick = async () => {
        try {
            const provider = new GoogleAuthProvider() 
            const auth = new getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log(result)
            const res = await fetch('/api/auth/google',{//response
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })//send the request
            })
            const data = await res.json()
            console.log(data)
            dispatch(signInSuccess(data))

        } catch (error) {
            console.log('could not sign in with google',error)
        }
    }
  return (
    <button type='button' onClick={handleClick} className='bg-red-700 text-white rounded-lg uppercase p-3 hover:opacity-95'>Continue with Google</button>
  )
}

export default OAuth