import React from "react";
import { CgClose } from "react-icons/cg";
import { db } from "../firebase";
import { addDoc, doc, updateDoc, collection } from "firebase/firestore";

const Modal = ({ isOpen, isClose, studentForm, setStudentForm, isView }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (studentForm.isEdit) {
        // Update existing document
        const docRef = doc(db, "students", studentForm.docId);
        await updateDoc(docRef, {
          ...studentForm,
          name: studentForm.name,
          class: studentForm.class,
          section: studentForm.section,
          rollNumber: studentForm.rollNumber,
          age: studentForm.age,
          address: studentForm.address,
          phoneNumber: studentForm.phoneNumber,
          email: studentForm.email,
          fatherName: studentForm.fatherName,
          motherName: studentForm.motherName,
          parentPhone: studentForm.parentPhone,
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
      <div className={"bg-white rounded-xl p-5 w-[100%] sm:w-[90%]"}>
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
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center items-center gap-3 flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Student Name"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.name}
                  onChange={handleChange}
                  name="name"
                />
                <input
                  type="text"
                  placeholder="Student Class"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.class}
                  onChange={handleChange}
                  name="class"
                />
                <input
                  type="text"
                  placeholder="Student Section"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.section}
                  onChange={handleChange}
                  name="section"
                />
              </div>
              <div className="flex justify-center items-center gap-3 flex-col sm:flex-row">
                <input
                  type="number"
                  placeholder="Student Roll Number"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.rollNumber}
                  onChange={handleChange}
                  name="rollNumber"
                />
                <input
                  type="number"
                  placeholder="Student Age"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.age}
                  onChange={handleChange}
                  name="age"
                />
                <input
                  type="text"
                  placeholder="Student Address"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.address}
                  onChange={handleChange}
                  name="address"
                />
              </div>
              <div className="flex justify-center items-center gap-3 flex-col sm:flex-row">
                <input
                  type="number"
                  placeholder="Student Phone Number"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.phoneNumber}
                  onChange={handleChange}
                  name="phoneNumber"
                />
                <input
                  type="email"
                  placeholder="Student Email"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.email}
                  onChange={handleChange}
                  name="email"
                />
                <input
                  type="text"
                  placeholder="Student Father Name"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.fatherName}
                  onChange={handleChange}
                  name="fatherName"
                />
              </div>
              <div className="flex justify-center items-center gap-3 flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Student Mother Name"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.motherName}
                  onChange={handleChange}
                  name="motherName"
                />
                <input
                  type="number"
                  placeholder="Parent Phone Number"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.parentPhone}
                  onChange={handleChange}
                  name="parentPhone"
                />
                <input
                  type="text"
                  placeholder="Student ID"
                  className="w-full p-2 rounded-lg mb-2 border"
                  value={studentForm.id}
                  onChange={handleChange}
                  name="id"
                  readOnly={studentForm.isEdit}
                />
              </div>
              {!isView && (
                <div className="flex justify-center items-center mt-10">
                  <button className="text-white bg-red-500 px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 cursor-pointer">
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
