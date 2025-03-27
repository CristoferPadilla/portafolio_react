
import {Navbar} from '../components/navbar';
import {ComunityLayout} from '../components/comunity_component';
export function ComunityScreen() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Navbar />
            <ComunityLayout />
        </div>
      );
}