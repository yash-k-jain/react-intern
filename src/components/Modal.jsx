import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { db } from "../firebase";
import { addDoc, doc, updateDoc, collection } from "firebase/firestore";

const Modal = ({ isOpen, isClose, studentForm, setStudentForm, isView }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validation for required fields
    if (!studentForm.name) newErrors.name = "Name is required.";
    if (!studentForm.class) newErrors.class = "Class is required.";
    if (!studentForm.section) newErrors.section = "Section is required.";
    if (!studentForm.rollNumber || isNaN(studentForm.rollNumber) || studentForm.rollNumber <= 0)
      newErrors.rollNumber = "Valid roll number is required.";
    if (!studentForm.age || isNaN(studentForm.age) || studentForm.age <= 0)
      newErrors.age = "Valid age is required.";
    if (!studentForm.address) newErrors.address = "Address is required.";
    if (!studentForm.phoneNumber || !/^\d{10}$/.test(studentForm.phoneNumber))
      newErrors.phoneNumber = "Valid 10-digit phone number is required.";
    if (!studentForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentForm.email))
      newErrors.email = "Valid email is required.";
    if (!studentForm.fatherName) newErrors.fatherName = "Father's name is required.";
    if (!studentForm.motherName) newErrors.motherName = "Mother's name is required.";
    if (!studentForm.parentPhone || !/^\d{10}$/.test(studentForm.parentPhone))
      newErrors.parentPhone = "Valid 10-digit parent phone number is required.";
    if (!studentForm.id && !studentForm.isEdit) newErrors.id = "Student ID is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (studentForm.isEdit) {
        // Update existing document
        const docRef = doc(db, "students", studentForm.docId);
        await updateDoc(docRef, {
          ...studentForm,
        });
        console.log("Student updated successfully");
      } else {
        const docRef = await addDoc(collection(db, "students"), {
          ...studentForm,
        });

        // Update the new document with its own `docId`
        await updateDoc(docRef, { docId: docRef.id });

        console.log("Document written with ID: ", docRef.id);
      }

      isClose(); // Close the modal
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bg-gray-400 w-full h-full flex justify-center items-center overflow-hidden">
      <div className="bg-white rounded-xl p-5 w-[100%] sm:w-[90%]">
        <div className="bg-white rounded-xl p-5 w-[100%]">
          <div className="flex justify-between">
            <h1 className="text-sm sm:text-3xl">
              {studentForm.isEdit ? "Edit" : isView ? "View" : "Add"} Student
            </h1>
            <button
              className="text-white bg-red-500 px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 cursor-pointer"
              onClick={isClose}
            >
              <CgClose />
            </button>
          </div>
          <hr className="my-3" />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Student Name"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.name}
                  onChange={handleChange}
                  name="name"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Student Class"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.class}
                  onChange={handleChange}
                  name="class"
                />
                {errors.class && <p className="text-red-500">{errors.class}</p>}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Student Section"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.section}
                  onChange={handleChange}
                  name="section"
                />
                {errors.section && <p className="text-red-500">{errors.section}</p>}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="number"
                  placeholder="Roll Number"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.rollNumber}
                  onChange={handleChange}
                  name="rollNumber"
                />
                {errors.rollNumber && <p className="text-red-500">{errors.rollNumber}</p>}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="number"
                  placeholder="Age"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.age}
                  onChange={handleChange}
                  name="age"
                />
                {errors.age && <p className="text-red-500">{errors.age}</p>}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.address}
                  onChange={handleChange}
                  name="address"
                />
                {errors.address && <p className="text-red-500">{errors.address}</p>}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.phoneNumber}
                  onChange={handleChange}
                  name="phoneNumber"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.email}
                  onChange={handleChange}
                  name="email"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Father's Name"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.fatherName}
                  onChange={handleChange}
                  name="fatherName"
                />
                {errors.fatherName && (
                  <p className="text-red-500">{errors.fatherName}</p>
                )}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Mother's Name"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.motherName}
                  onChange={handleChange}
                  name="motherName"
                />
                {errors.motherName && (
                  <p className="text-red-500">{errors.motherName}</p>
                )}
              </div>
              <div className="w-full sm:w-1/3">
                <input
                  type="number"
                  placeholder="Parent Phone Number"
                  className="w-full p-2 rounded-lg border"
                  value={studentForm.parentPhone}
                  onChange={handleChange}
                  name="parentPhone"
                />
                {errors.parentPhone && (
                  <p className="text-red-500">{errors.parentPhone}</p>
                )}
              </div>
            </div>
            {!isView && (
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
