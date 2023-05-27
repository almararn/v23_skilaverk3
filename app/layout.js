import "./globals.css"
import TopMenu from "./components/TopMenu"

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
