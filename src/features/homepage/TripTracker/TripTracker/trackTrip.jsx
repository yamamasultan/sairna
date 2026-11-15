import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from"react-router-dom";

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


const TripTracker=()=>{
    const navigate =useNavigate();

    const tripCenter = [34.7311, 36.7158];

    const handleTrackClick = () => {
        navigate('/track-trip-details');
    };
return(
    <section  className="max-w-6xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-sm border border-gray-100 dir-rtl">
    <div  className="flex flex-col lg:flex-row items-center justify-between gap-10">
        
  {/* الخريطة */}
     <div className="w-full lg:w-1/2 bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-between">
     <div className="flex justify-between items-center mb-3 px-2">
        <span className="text-xs font-semibold text-gray-500">حلب-دمشق</span>
        <span className="text-xs font-bold text-teal-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
             خريطة حقيقية مباشرة
        </span>
     </div>
    <div className="relative h-64 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
     <MapContainer
        center={tripCenter} 
         zoom={7} 
         scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
     >
        <TileLayer
          
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={tripCenter}>
            <Popup>
                مرحبا,الرحلة جارية الان في هذا المسار

            </Popup>
        </Marker>
     </MapContainer>
    </div>

    <div className="mt-4 px-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1">
            <span>دمشق</span>
            <span>حلب</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full relative overflow-hidden">
            <div className="h-full bg-teal-500 w-2/3 rounded-full"></div>
        </div>
     </div>
    </div>
    {/* قسم الكتابة */}
    <div className="w-full lg:w-1/2 space-y-5 text-right">
    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-xs font-bold rounded-full border border-teal-100">
        وين وصلت الرحلة؟
    </span>

    <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-3">
       . الطريق قدامك<br/>
        <span className="text-teal-600">لحظة بلحظة؟</span>
    </h2>
     <p className="text-sm text-gray-600 leading-relaxed">
        بصفحة التتبّع بتشوف خط سير الرحلة ومحطاتها وحالتها ضمن نموذج تفاعلي سهل وواضح.
     </p>
     <ul className="space-y-3 text-sm text-gray-700 font-medium pt-2">
        <li className="flex items-center gap-3 justify-end">
            <span>عرض المسار على الخريطة</span>
              <FaCheckCircle/>
        </li>
        <li className="flex items-center gap-3 justify-end">
            <span>وقت وصول تقديري ومحطات الطريق</span>
            <FaCheckCircle/>
        </li>

     </ul>

    {/* الزر */}
     <div className="flex flex-col items-end gap-2">
        <button 
         onClick={handleTrackClick}
        className="flex  items center justify-center gap-2 px-7 py-3 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition-all shadow-md active:scale-95 cursor-pointer
        hover:-translate-y-1 flex items-center justify-center gap-2 px-7 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-md transition-all duration-300 hover:shadow-lg
        ">
         <span>جرّب تتبع رحلة</span>
         <FaArrowLeft className="text-xs" />
        </button>
    <p className="text-xs text-gray-500" >
          الخريطة وحركة الحافلة في هذا النموذج توضيحية وليست GPS مباشر.
    </p>
           
     </div>

    </div>
  </div>
 </section>
);
};
export default TripTracker;
