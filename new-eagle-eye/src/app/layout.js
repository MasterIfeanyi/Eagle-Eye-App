import './globals.css'

export const metadata = {
  title: 'Eagle Eye',
  description: 'See something, say something',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="App">
          <div className="mobile-container">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}