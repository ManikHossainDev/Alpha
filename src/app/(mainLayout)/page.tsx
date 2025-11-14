"use client"
import React, { useRef, ChangeEvent, FormEvent } from 'react';
import { Camera, Upload, Calendar } from 'lucide-react';
import Image from 'next/image';

const Page: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const imagePreviewRef = useRef<HTMLImageElement | null>(null);
  const uploadStatusRef = useRef<HTMLParagraphElement | null>(null);

  // Handle profile image selection
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imagePreviewRef.current) {
          imagePreviewRef.current.src = reader.result as string;
          imagePreviewRef.current.style.display = 'block';
        }
        if (uploadStatusRef.current) {
          uploadStatusRef.current.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const address = form.address.value;
    const contactNumber = form.contactNumber.value;
    const birthday = form.birthday.value;
    const profileImage = fileInputRef.current?.files?.[0];

    if (!firstName || !lastName || !email) {
      alert('Please fill in all required fields!');
      return;
    }

    const submitData = new FormData();
    submitData.append('firstName', firstName);
    submitData.append('lastName', lastName);
    submitData.append('email', email);
    submitData.append('address', address);
    submitData.append('contactNumber', contactNumber);
    submitData.append('birthday', birthday);
    if (profileImage) submitData.append('profileImage', profileImage);

    console.log('Submitting Form Data:', {
      firstName,
      lastName,
      email,
      address,
      contactNumber,
      birthday,
      profileImage,
    });

    alert('Changes saved successfully!');
  };

  const handleCancel = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (imagePreviewRef.current) {
      imagePreviewRef.current.style.display = 'none';
      imagePreviewRef.current.src = '';
    }
    if (uploadStatusRef.current) {
      uploadStatusRef.current.style.display = 'none';
    }
    formRef.current?.reset();
  };

  return (
    <div className="min-h-screen py-5 px-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800">Account Information</h1>
        <hr className='w-[20%] border border-[#5272FF] mb-4 ml-2' />

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="w-[50%] mb-8 p-2 border-2 border-gray-200 rounded-xl bg-gray-50">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center cursor-pointer" onClick={handleUploadClick}>
                  <Camera className="w-12 h-12 text-gray-400" />
                  <Image 
                    ref={imagePreviewRef}
                    src="" 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full absolute top-0 left-0"
                    style={{ display: 'none' }}
                    width={128}
                    height={128}
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg cursor-pointer" onClick={handleUploadClick}>
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Upload className="w-5 h-5" />
                  Upload New Photo
                </button>
                <p 
                  ref={uploadStatusRef}
                  className="text-sm text-green-600 mt-2" 
                  style={{ display: 'none' }}
                >
                  ✓ Image uploaded successfully
                </p>
              </div>
            </div>
          </div>

          <div className='border-2 rounded-lg p-2 border-[#A1A3ABA1]'>
            {/* Form Fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter email address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter contact number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Birthday</label>
                <div className="relative">
                  <input
                    type="date"
                    name="birthday"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;