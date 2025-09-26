import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from './ui/button'

export function Header() {
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <header>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Invoice Manager</h1>
        {isAuthenticated ? (
          <Button onClick={() => logout()} variant="outline">
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate('/login')} variant="outline">
            Login
          </Button>
        )}
      </div>
    </header>
  )
}