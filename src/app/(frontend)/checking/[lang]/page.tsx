'use client'
import Form from 'next/form'
import { MdPersonSearch } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { redirect, useParams } from 'next/navigation'
import { Inquiry, Student } from '@/payload-types'
import Loading from '@/components/Loading'

function EnglishChecking() {
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [createInquiryloading, setCreateInquiryLoading] = useState<Boolean>(false)
  const [inquiryData, setInquiryData] = useState<Inquiry>()
  const params = useParams()
  const lang = params.lang
  const getStudents = async () => {
    setLoading(true)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/students?where[parentMobileNumber][equals]=${mobileNumber}`,
    )
    const results = await response.json()
    setSelectedStudent([])
    setStudents(results.docs)
    setLoading(false)
  }
  const createInquiry = async () => {
    setCreateInquiryLoading(true)
    const data = {
      parentName: selectedStudent[0]?.parentName,
      studentName: selectedStudent.map((s) => s.id),
      status: 'Pending',
      reason: '',
    } as Inquiry

    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const response: { doc: Inquiry; message: string } = await request.json()
      setInquiryData(response.doc)
    } catch (error) {
      setCreateInquiryLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (inquiryData?.id) {
      redirect(
        `/options?lang=${lang}&inquiryId=${inquiryData?.id}&parentName=${inquiryData?.parentName}&status=${inquiryData?.status}`,
      )
    }
  }, [inquiryData])
  return (
    <>
      {createInquiryloading && (
        <div>
          <Loading />
        </div>
      )}
      {lang === 'ar' && !createInquiryloading && (
        <div>
          <div>
            <p className="text-4xl text-center mb-2">يرجى ملء المعلومات أدناه</p>
          </div>
          <div className="text-2xl text-right">
            <Form action={'/options'} scroll={false} className="space-y-3">
              <div className="grid grid-cols-5 gap-3 items-center">
                <input className="hidden" defaultValue={lang} id="lang" name="lang" type="text" />
                <label className="col-span-2 order-2" htmlFor="parentName">
                  : اسم ولي الامر
                </label>
                <input
                  required
                  className="col-span-3 backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded order-1 text-right"
                  type="text"
                  id="parentName"
                  name="parentName"
                  autoComplete="off"
                  placeholder="أدخل اسم الوالدين"
                />
              </div>
              <div className="grid grid-cols-5 gap-3 items-center">
                <label className="col-span-2 order-2" htmlFor="phoneNumber">
                  : رقم الهاتف
                </label>

                <input
                  required
                  className="col-span-3 backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded text-right"
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  autoComplete="off"
                  placeholder="أدخل رقم الهاتف"
                />
              </div>
              <div className="grid grid-cols-5 gap-3 items-center">
                <label className="col-span-2 order-2" htmlFor="studentName">
                  : اسم الطالب
                </label>

                <input
                  required
                  className="col-span-3 backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded text-right"
                  type="text"
                  id="studentName"
                  name="studentName"
                  autoComplete="off"
                  placeholder="أدخل اسم الطالب"
                />
              </div>
              <div className="grid grid-cols-5 gap-3 items-center">
                <label className="col-span-2 order-2" htmlFor="studentClass">
                  : صف الطالب
                </label>

                <input
                  required
                  className="col-span-3 backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded text-right"
                  type="number"
                  id="studentClass"
                  name="studentClass"
                  autoComplete="off"
                  placeholder="أدخل فئة الطالب"
                />
              </div>
              <div className="grid grid-cols-5 gap-3 items-center">
                <label className="col-span-2 order-2" htmlFor="studentId">
                  : رقم الطالب
                </label>

                <input
                  required
                  className="col-span-3 backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded text-right"
                  type="number"
                  id="studentId"
                  name="studentId"
                  autoComplete="off"
                  placeholder="أدخل الرقم التعريفي للطالب"
                />
              </div>

              <div className="flex justify-center ">
                <input
                  className="mt-10 rounded-2xl hover:rounded-lg px-10 py-3 text-center text-white shadow-md transition-all duration-500 bg-gradient-to-tl from-green-500 via-blue-500 to-indigo-400 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:-translate-y-1 hover:cursor-pointer"
                  type="submit"
                  value="التالي"
                />
              </div>
            </Form>
          </div>
        </div>
      )}
      {lang === 'en' && !createInquiryloading && (
        <div>
          <div>
            <p className="text-lg text-center mb-2">Please fill in the information below</p>
          </div>
          <div className="text-lg">
            <div className="space-y-10">
              {/* <div className="grid grid-cols-5 gap-3 items-center">
                <label className="col-span-2" htmlFor="parentName">
                  Parent Name:
                </label>
                <input className="hidden" defaultValue={lang} id="lang" name="lang" type="text" />
                <input
                  required
                  className="col-span-3 backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded"
                  type="text"
                  id="parentName"
                  name="parentName"
                  autoComplete="off"
                  placeholder="Enter parent name"
                />
              </div> */}
              <div className="grid grid-cols-5 gap-3 items-center">
                {/* <label className="col-span-2" htmlFor="phoneNumber">
                  Phone Number:
                </label> */}

                <div className="col-span-5 relative">
                  <input
                    required
                    className=" backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded w-96"
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    autoComplete="off"
                    placeholder="Enter 10 digit mobile number"
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  <button
                    onClick={() => getStudents()}
                    className="text-white p-2 absolute right-[2px] top-[2px] shadow-md transition-all duration-500 bg-gradient-to-tl from-green-500 via-blue-500 to-indigo-400 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:cursor-pointer"
                  >
                    <MdPersonSearch />
                  </button>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg transition-all h-36">
                <h2 className="mb-2 text-center">Select Student Names</h2>
                <div
                  className={`flex justify-center items-center gap-5 transition-all ${students?.length ? 'opacity-100' : 'opacity-0'}`}
                >
                  {students?.length !== 0 &&
                    !loading &&
                    students?.map((student) => (
                      <button
                        onClick={() => {
                          if (selectedStudent?.find((s) => s.id === student.id)) {
                            return setSelectedStudent(
                              selectedStudent.filter((s) => s.id !== student.id),
                            )
                          } else {
                            setSelectedStudent([...selectedStudent, student])
                          }
                        }}
                        className={`text-white px-10 py-2 shadow-md rounded-3xl transition-all duration-500 bg-gradient-to-tl bg-size-200 bg-pos-0 hover:bg-pos-100 hover:cursor-pointer ${selectedStudent.find((s) => s.id === student.id) ? 'bg-black' : 'from-green-500 via-blue-500 to-indigo-400'}`}
                        key={student.id}
                      >
                        {student.studentName}
                      </button>
                    ))}
                </div>
                {students?.length === 0 && !loading && (
                  <p className={`${students?.length ? 'opacity-0' : 'opacity-100'} text-center`}>
                    No Student
                  </p>
                )}
                {loading && (
                  <div className="flex justify-center items-center">
                    <Loading />
                  </div>
                )}
              </div>
              {/* <div className="grid grid-cols-5 gap-3 items-center">
                <label className="col-span-2" htmlFor="studentName">
                  Student Name:
                </label>

                <input
                  required
                  className="col-span-3 backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded"
                  type="text"
                  id="studentName"
                  name="studentName"
                  autoComplete="off"
                  placeholder="Enter student name"
                />
              </div> */}
              {/* <div className="grid grid-cols-5 gap-3 items-center">
                <label className="col-span-2" htmlFor="studentClass">
                  Student Class:
                </label>

                <input
                  required
                  className="col-span-3 backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded"
                  type="number"
                  id="studentClass"
                  name="studentClass"
                  autoComplete="off"
                  placeholder="Enter student class"
                />
              </div>
              <div className="grid grid-cols-5 gap-3 items-center">
                <label className="col-span-2" htmlFor="studentId">
                  Student ID:
                </label>

                <input
                  required
                  className="col-span-3 backdrop-blur-0 outline-blue-300 outline-offset-1 border border-blue-200 font-mono bg-[#ffffffb0] p-1 rounded"
                  type="number"
                  id="studentId"
                  name="studentId"
                  autoComplete="off"
                  placeholder="Enter student ID"
                />
              </div> */}

              <div className="flex justify-center w-full">
                <button
                  onClick={() => createInquiry()}
                  className={`w-full rounded-2xl hover:rounded-lg px-10 py-3 text-center text-white shadow-md transition-all duration-500 bg-gradient-to-tl from-green-500 via-blue-500 to-indigo-400 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:-translate-y-1 hover:cursor-pointer ${selectedStudent?.length === 0 ? 'hidden' : 'block'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EnglishChecking
