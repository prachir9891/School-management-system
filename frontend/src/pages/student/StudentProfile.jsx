import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Hash, 
  BookOpen, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap 
} from 'lucide-react';

export default function StudentProfile() {
  const { user } = useAuth();
  
  // Destructure for easier access
  const details = user?.studentDetails || {};

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:bg-indigo-50/50 hover:border-indigo-100">
      <div className="flex-shrink-0 mt-1">
        <Icon className="h-5 w-5 text-indigo-500" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-gray-900">{value || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
      </div>

      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-8">
            <div className="flex items-end space-x-5">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-purple-100">
                {details.photoUrl ? (
                  <img src={details.photoUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-indigo-600">{user?.name?.charAt(0) || 'S'}</span>
                )}
              </div>
              <div className="pb-2">
                <h2 className="text-3xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm font-medium text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-full mt-2">
                  Student
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem 
              icon={Hash} 
              label="Student ID" 
              value={details.studentId} 
            />
            <InfoItem 
              icon={BookOpen} 
              label="Class & Section" 
              value={details.class && details.section ? `${details.class} - ${details.section}` : null} 
            />
            <InfoItem 
              icon={Calendar} 
              label="Date of Birth" 
              value={formatDate(details.dateOfBirth)} 
            />
            <InfoItem 
              icon={User} 
              label="Gender" 
              value={details.gender} 
            />
            <InfoItem 
              icon={Users} 
              label="Parent / Guardian" 
              value={details.parentName} 
            />
            <InfoItem 
              icon={Phone} 
              label="Parent Contact" 
              value={details.parentContact} 
            />
            <InfoItem 
              icon={Phone} 
              label="Student Contact" 
              value={details.contactNumber} 
            />
            <InfoItem 
              icon={Mail} 
              label="Email Address" 
              value={user?.email} 
            />
            <InfoItem 
              icon={GraduationCap} 
              label="Admission Date" 
              value={formatDate(details.admissionDate)} 
            />
          </div>

          <div className="mt-6">
            <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex-shrink-0 mt-1">
                <MapPin className="h-5 w-5 text-indigo-500" />
              </div>
              <div className="ml-4 w-full">
                <p className="text-sm font-medium text-gray-500">Residential Address</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">{details.address || 'N/A'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
