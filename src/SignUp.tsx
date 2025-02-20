/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'
import Loader from "./Loader";
export default function Signup() {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    country: "",
    education: "",
    specialization_id: "",
    sub_specialization_id: "",
    notifications: false,
  });
  const [loading,setLoading] = useState<boolean>(false)
  const [specializations, setSpecializations] = useState([]); // Initialize as an empty array
  const [subSpecializations, setSubSpecializations] = useState([]); // Initialize as an empty array

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const isFormValid = () => {
    return (
      formData.f_name.trim() !== "" &&
      formData.l_name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.password_confirmation.trim() !== "" &&
      formData.password === formData.password_confirmation && // Ensure passwords match
      formData.phone.trim() !== "" &&
      formData.country.trim() !== "" &&
      formData.education.trim() !== "" &&
      formData.specialization_id.trim() !== "" &&
      formData.sub_specialization_id.trim() !== ""
    );
  };
  const handleSubmit = async (e:any) => {
    setLoading(true)
  
    e.preventDefault();
    try {
      await axios.post("http://website-3f915aec.ghx.jqs.temporary.site/arab-experts/public/api/singUp", formData);
      alert("Signup successful");
    } catch (error:any) {
      console.log(error);
      alert(error.response.data.message);
    }
    finally{
      setLoading(false)
    }
  };

  const getSpecializations = async () => {
    try {
      const res = await axios.get(
        "http://website-3f915aec.ghx.jqs.temporary.site/arab-experts/public/api/show_specializations?lang=en"
      );
    
      if (Array.isArray(res.data.data)) {
        setSpecializations(res.data.data);
      } else {
        console.error("API response is not an array:", res.data);
        setSpecializations([]); 
      }
    } catch (error) {
      console.error("Error fetching specializations:", error);
      setSpecializations([]); 
    }
  };

  const getSubSpecializations = async (specializationId:any) => {
    try {
      setLoading(true)
      const res = await axios.get(
        `http://website-3f915aec.ghx.jqs.temporary.site/arab-experts/public/api/show_specialization_subs?lang=en&specialization_id=${specializationId}`
      );
      
      if (Array.isArray(res.data.data)) {
        setSubSpecializations(res.data.data);
      } else {
        console.error("API response is not an array:", res.data);
        setSubSpecializations([]); 
      }
    } catch (error) {
      setLoading(false)
      console.error("Error fetching sub-specializations:", error);
      setSubSpecializations([]); 
    }
    finally{
      setLoading(false)
    }
  };

  const handleSpecializationChange = (e:any) => {
    const specializationId = e.target.value;
    setFormData({ ...formData, specialization_id: specializationId });
    getSubSpecializations(specializationId);
  };

  useEffect(() => {
    getSpecializations();
    console.log(isFormValid());
  }, []);
  return (
    <div className="bg-img min-h-screen w-full p-8">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-lg bg-white/50 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label className="font-medium text-black">First Name</label>
            <input
              name="f_name"
              value={formData.f_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-black">Last Name</label>
            <input
              name="l_name"
              value={formData.l_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-black">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-black">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-black">Confirm Password</label>
            <input
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-black">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-black">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-black">Education Level</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            >
              <option value="">Select Education Level</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-black">Specialization</label>
            <select
              name="specialization_id"
              value={formData.specialization_id}
              onChange={handleSpecializationChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            >
              <option value="">Select Specialization</option>
              {specializations && specializations.map((spec:any) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-black">Sub Specialization</label>
            <select
              name="sub_specialization_id"
              value={formData.sub_specialization_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c7197]"
            >
              <option value="">Select Sub Specialization</option>
              {subSpecializations && subSpecializations.map((subSpec:any) => (
                <option key={subSpec.id} value={subSpec.id}>
                  {subSpec.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Receive email updates</label>
          </div>
          <button
            type="submit" 
            className={`w-full bg-[#0c7197] text-white py-2 rounded ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={!isFormValid()}
          
          >
            Sign Up
          </button>
        </form>
      </div>
      {
        loading &&
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Loader />
          </div>
      }
    </div>
  );
}
