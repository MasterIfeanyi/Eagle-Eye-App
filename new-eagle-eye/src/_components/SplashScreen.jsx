'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const SplashScreen = () => {
    const [visible, setVisible] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)

            setTimeout(() => {
                router.push('/welcome')
            }, 700)
        }, 2000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className={`splash-screen ${visible ? 'visible' : 'hidden'}`}>
            <div className="splash_message-container">
                <img src="/eagle.png" alt="logo" className='splash-logo' />
                <p className='fw-bold fs-2'>Eagle Eye</p>
            </div>
        </div>
    )
}

export default SplashScreen