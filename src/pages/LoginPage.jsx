import { useNavigate } from 'react-router-dom'
import AuthLogin from '../components/study/auth-login'
import { signIn } from '../lib/auth'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <AuthLogin
      onAuth={() => {
        signIn()
        navigate('/', { replace: true })
      }}
      onSwitch={() => navigate('/signup')}
    />
  )
}
