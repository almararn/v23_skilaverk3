import "./globals.css"
import TopMenu from "./components/TopMenu"
import Footer from "./components/Footer"

export const metadata = {
  title: 'Lil bits',
  description: 'Your favorite restaurant',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-lil-yellow font-poppins">
        <TopMenu />
        {children}
        <Footer />
      </body>
    </html>
  )
}
