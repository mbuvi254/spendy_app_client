import Navigation from '../components/Navigation'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="p-6">{children}</main>

      <footer className="bg-white shadow p-4 mt-6 text-center text-gray-500">
        © 2025 Cybermaisha
      </footer>
    </div>
    </>
  )
}

export default Layout
