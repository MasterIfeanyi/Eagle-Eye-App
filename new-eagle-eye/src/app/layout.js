import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

export const metadata = {
  title: 'Eagle Eye',
  description: 'See something, say something',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          <div className="App">
            <div className="mobile-container">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}