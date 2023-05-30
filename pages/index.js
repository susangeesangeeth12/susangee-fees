import { BriefcaseIcon, MailIcon, PhoneIcon } from "@heroicons/react/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QrReader } from "react-qr-reader";
import Image from "next/image";
import LOGO2 from "../public/LOGO2.jpg";
import Swal from "sweetalert2";
export default function Home() {
  const [contactDetail, setContactDetail] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const existingData = localStorage.getItem("contactDetail");
    if (existingData) {
      const newData = JSON.parse(existingData);
      newData.push(data);
      localStorage.setItem("contactDetail", JSON.stringify(newData));
      window.location.reload();
    } else {
      localStorage.setItem("contactDetail", JSON.stringify([data]));
      window.location.reload();
    }
    Swal.fire({
      icon: "success",
      title: "Successfully Added",
      showCancelButton: false,
      timer: 1000,
    });
    reset();
  };

  useEffect(() => {
    const data = localStorage.getItem("contactDetail");
    if (data) {
      setContactDetail(JSON.parse(data));
    }
  }, []);
  // console.log("contact Detail", contactDetail);
  const removeItem = (index) => {
    const existingData = localStorage.getItem("contactDetail");
    if (existingData) {
      const newData = JSON.parse(existingData);
      newData.splice(index, 1);
      localStorage.setItem("contactDetail", JSON.stringify(newData));
      setContactDetail(newData);
      window.location.reload();
    }
  };
  const [data, setData] = useState("Scan...");
  return (
    <>
      <div className="h-screen relative bg-white">
        <div className="absolute inset-0"></div>
        <div className="h-full relative max-w-7xl mx-auto lg:grid lg:grid-cols-10">
          <div className="bg-zinc-100 py-15 px-4 sm:px-6 lg:col-span-3 lg:px-8 xl:pl-10">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <form
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
                className="grid grid-cols-1 gap-y-4"
              >
                <Image src={LOGO2} width={320} height={50} alt="music" />
                <div>
                  <label htmlFor="Name" className="sr-only">
                    Full name
                  </label>
                  <input
                    type="select"
                    value={data}
                    name="fullName"
                    id="fullName"
                    autoComplete="name"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="Name"
                    {...register("fullName", { required: true })}
                  />
                </div>
                <div>
                  <label htmlFor="Yes/No" className="sr-only">
                    Date
                  </label>
                  <input
                    type="date"
                    name="email"
                    id="email"
                    autoComplete="tel"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="Amount"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label htmlFor="Money" className="sr-only">
                    Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="Amount"
                    {...register("phone", { required: false })}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Save
                  </button>
                </div>
                {/*to change qr reader size */}
                <QrReader
                  className=" py-1 px-14"
                  onResult={(result, error) => {
                    if (!!result) {
                      setData(result?.text);
                    }

                    if (!!error) {
                      console.info(error);
                    }
                  }}
                  //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
                  // open the front camera
                  constraints={{ facingMode: "environment" }}
                  style={{ width: "30%", height: "30%" }}
                />
                <div class="flex flex-col">
                  <div>
                    <div>
                      <div class="overflow-hidden">
                        <table class="table-auto">
                          <thead></thead>
                          <tbody>
                            {contactDetail.map((contact, index) => (
                              <tr
                                key={contact.fullName}
                                className={`${
                                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                }`}
                              >
                                <td className="text-sm">{contact.fullName}</td>
                                <td class="whitespace-nowrap px-6 py-4 text-sm">
                                  {contact.email}
                                </td>
                                <td className="text-sm">{contact.phone}</td>
                                <td className="text-sm">
                                  <button
                                    onClick={() => removeItem(index)}
                                    type="button"
                                    class="  text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-1 py-1.5 text-center mr-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                  >
                                    DEL
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div class="flex flex-col-reverse divide-y divide-y-reverse">
                <div></div>
                <div>{""}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
