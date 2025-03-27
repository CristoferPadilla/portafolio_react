import {Dashboard} from '../components/dashboard'
import {Navbar} from '../components/navbar'

export function DashboardScreen() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Navbar />
            <Dashboard />
        </div>
      );
}