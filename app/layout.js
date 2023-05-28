import "./globals.css"
import TopMenu from "./components/TopMenu"

export const metadata = {
  title: 'Lil bits',
  description: 'Your favorite restaurant',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopMenu />
        {children}
      </body>
    </html>
  )
}
