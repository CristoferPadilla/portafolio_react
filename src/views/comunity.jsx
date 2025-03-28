
import {Navbar} from '../components/navbar';
import {ComunityLayout} from '../components/comunity_component';
export function ComunityScreen() {
    return (
        <div className="flex flex-col md:flex-row bg-gray-100"> 
            <Navbar />
            <div className="flex-1 min-h-screen"> 
                <ComunityLayout />
            </div>
        </div>
    );
}