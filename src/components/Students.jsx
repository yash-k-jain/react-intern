import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "./Modal";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isView, setIsView] = useState(false);

  const [studentForm, setStudentForm] = useState({
    id: "",
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    age: "",
    address: "",
    phoneNumber: "",
    email: "",
    fatherName: "",
    motherName: "",
    parentPhone: "",
    isEdit: false,
  });

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const students = querySnapshot.docs.map((doc) => ({
        docId: doc.id, // Document ID
        ...doc.data(), // Document data
      }));
      setStudents(students);
    } catch (error) {
      console.error("Error fetching students: ", error);
      return [];
    }
  };

  const deleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      console.log(`Student with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    // Update local state to reflect the deletion
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      const studentsData = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsData);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <>
      {isOpen && (
        <Modal
          studentForm={studentForm}
          setStudentForm={setStudentForm}
          isOpen={isOpen}
          isClose={() => setIsOpen(false)}
          isView={isView}
        />
      )}
      <div className="w-full min-h-[90vh] bg-slate-400 p-5 overflow-hidden">
        <div className="bg-white rounded-xl p-5 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Students</h1>
            <button
              onClick={() => {
                setStudentForm({
                  id: "",
                  name: "",
                  class: "",
                  section: "",
                  rollNumber: "",
                  age: "",
                  address: "",
                  phoneNumber: "",
                  email: "",
                  fatherName: "",
                  motherName: "",
                  parentPhone: "",
                  isEdit: false,
                });
                setIsView(false);
                setIsOpen(true);
              }}
              className="text-white bg-red-500 px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            >
              Add Student
            </button>
          </div>
          <hr className="my-3" />
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Class
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Section
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Roll Number
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Father's Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {student.id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {student.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {student.class}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {student.section}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {student.rollNumber}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {student.fatherName}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex space-x-2">
                        <FaEye
                          onClick={() => {
                            setIsView(true);
                            setStudentForm({
                              ...student,
                              isEdit: false,
                            });
                            setIsOpen(true);
                          }}
                          className="text-blue-500 cursor-pointer"
                        />
                        <FaEdit
                          onClick={() => {
                            setStudentForm({
                              ...student,
                              isEdit: true,
                            });
                            setIsView(false);
                            setIsOpen(true);
                          }}
                          className="text-yellow-500 cursor-pointer"
                        />
                        <FaTrash
                          onClick={() => handleDelete(student.docId)}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
