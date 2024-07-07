import { useAuthContext } from '../hooks/useAuthContext';

function Dashboard() {
    const { user } = useAuthContext()
    const userLogged = user.user

}

export default Dashboard;