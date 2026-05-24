'use client'
import Link from 'next/link'

const MissingRoute = () => {
    return (
        <div className='missing'>
            <div className="banner-message">
                <div className="section-title">
                    <h1>404</h1>
                    <p>Oops. This page does not exist</p>
                    <Link href="/welcome" className="button btn-brand mt-3">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MissingRoute