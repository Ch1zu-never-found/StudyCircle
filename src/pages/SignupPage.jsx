import { useNavigate } from 'react-router-dom'
import AuthSignup from '../components/study/auth-signup'
import { signIn } from '../lib/auth'

export default function SignupPage() {
  const navigate = useNavigate()

  return (
    <AuthSignup
      onAuth={() => {
        signIn()
        navigate('/', { replace: true })
      }}
      onSwitch={() => navigate('/login')}
    />
  )
}
