"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from "react-google-recaptcha";

function RetreivePhone({ smartphones, index, onEdit, onDelete }) {
    // const rights = [patient.Patient_Rights_1, patient.Patient_Rights_2, patient.Patient_Rights_3].filter(Boolean);

    return (
        <tr>
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4">{smartphones.brand}</td>
            <td className="py-2 px-4">{smartphones.model}</td>
            {/* <td className="py-2 px-4">
                {rights.map((right, i) => (
                    <span key={i} className="me-2 inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs
    
    font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">

                        {right}
                    </span>
                ))}
            </td> */}
            <td className="py-2 px-4">{smartphones.price}</td>
            <td className="py-2 px-4">{smartphones.support5G}</td>
            <td className="py-2 px-4">{smartphones.processorBrand}</td>
            <td className="py-2 px-4">{smartphones.batteryCapacity}</td>
            <td className="py-2 px-4">{smartphones.ramCapacity}</td>
            <td className="py-2 px-4">{smartphones.internalMemory}</td>
            <td className="py-2 px-4">{smartphones.screenSize}</td>
            <td className="py-2 px-4">{smartphones.refreshRate}</td>
            <td className="py-2 px-4">{smartphones.os}</td>
            <td className="py-2 px-4">
                <button onClick={() => onEdit(smartphones)} className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faPenToSquare} /></button>
                <button onClick={() => onDelete(smartphones)} className="text-red-500 hover:text-red-700 ml-2">
                    <FontAwesomeIcon icon={faTrash} /></button>

            </td>
        </tr>
    );
}

export default function Smartphone() {
    const [captcha, setCaptcha] = useState(null);

    const [smartphones, setSmartphones] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedSmartphones, setSelectedSmartphones] = useState({
        brand: "",
        model: "",
        price: "",
        support5G: "",
        processorBrand: "",
        batteryCapacity: "",
        ramCapacity: "",
        internalMemory: "",
        screenSize: "",
        refreshRate: "",
        os: "",
    });
    // const [rights, setRights] = useState([]);
    // const [selectedSmartphones, setSelectedSmartphones] = useState(null);

    // CRUD Modal State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [refreshRate, setRefreshRate] = useState(""); // เก็บค่าที่เลือก
    const [customRate, setCustomRate] = useState(""); // เก็บค่าที่ผู้ใช้กรอก

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const smartphonesPerPage = 50;
    const indexOfLastSmartphone = currentPage * smartphonesPerPage;
    const indexOfFirstSmartphone = indexOfLastSmartphone - smartphonesPerPage;
    const currentSmartphone = smartphones.slice(
        indexOfFirstSmartphone,
        indexOfLastSmartphone);
    const totalPages = Math.ceil(smartphones.length / smartphonesPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // f การทำงานกับข้อมูล
    useEffect(() => {
        fetch("http://localhost:3001/smartphones")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setSmartphones(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 pt-8 mt-8 center">
                <div>Loading Smartphones...</div>
            </div>
        );
    }

    // create function
    const handleCreateClick = () => {
        setSelectedSmartphones({
            brand: "",
            model: "",
            price: "",
            support5G: "",
            processorBrand: "",
            batteryCapacity: "",
            ramCapacity: "",
            internalMemory: "",
            screenSize: "",
            refreshRate: "",
            os: "",
        });
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    // const handleCreateSubmit = (e) => {
    //     e.preventDefault();
    //     fetch("http://localhost:3001/smartphones/create/", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(selectedSmartphones),
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setSmartphones(data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //     setIsCreateModalOpen(false);
    // };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/smartphones/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedSmartphones),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setSmartphones(data);
            })
            .catch((err) => {
                console.log(err);
            });
        // setOrderPerPage(10);
        setIsCreateModalOpen(false);
    };


    // Edit Update
    const handleEditClick = (smartphones) => {
        setSelectedSmartphones(smartphones);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/smartphones/update/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedSmartphones),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setSmartphones(data);
            })
            .catch((err) => {
                console.log(err);
            });
        setIsEditModalOpen(false);
    };

    // Delete
    const handleDeleteClick = (smartphones) => {
        setSelectedSmartphones(smartphones);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteSubmit = () => {
        fetch(`http://localhost:3001/smartphones/delete/${selectedSmartphones.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedSmartphones)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setSmartphones(data);
            })
            .catch((err) => {
                console.log(err);
            });
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="container mx-auto px-4 pt-8 mt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Smartphones</h1>
                <button onClick={handleCreateClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Smartphone
                </button>
            </div>
            <table className="w-full mt-8 border-b-4 border-blue-400 shadow-lg z-0">
                <thead className='bg-blue-300 text-black text-left p-1'>
                    <tr>
                        <th className="py-2 px-4">No.</th>
                        <th className="py-2 px-4">Brand</th>
                        <th className="py-2 px-4">Model</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">5G</th>
                        <th className="py-2 px-4">Processor</th>
                        <th className="py-2 px-4">Battery</th>
                        <th className="py-2 px-4">RAM</th>
                        <th className="py-2 px-4">Memory</th>
                        <th className="py-2 px-4">Screen</th>
                        <th className="py-2 px-4">Refresh</th>
                        <th className="py-2 px-4">OS</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {currentSmartphone.map((smartphones, index) => (
                        <RetreivePhone
                            key={index}
                            smartphones={smartphones}
                            index={indexOfFirstSmartphone + index} // การแสดงผลของหน้า
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </tbody> */}
                <tbody>
                    {currentSmartphone.map((smartphones, index) => {
                        const formattedSmartphones = {
                            ...smartphones,
                            brand: smartphones.brand.charAt(0).toUpperCase() + smartphones.brand.slice(1),
                            model: smartphones.model.charAt(0).toUpperCase() + smartphones.model.slice(1),
                            processorBrand: smartphones.processorBrand.charAt(0).toUpperCase() + smartphones.processorBrand.slice(1),
                            os: smartphones.os.toLowerCase() === "ios"
                            ? "iOS"
                            : smartphones.os.charAt(0).toUpperCase() + smartphones.os.slice(1),                        };

                        return (
                            <RetreivePhone
                                key={index}
                                smartphones={formattedSmartphones}
                                index={indexOfFirstSmartphone + index}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                            />
                        );
                    })}
                </tbody>

            </table>
            <div className="flex justify-center mt-4 pd-20">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1
                            ? "bg-blue-600 text-white" // ปุ่มปัจจุบันจะมีสีมืดขึ้น
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-700">Add Phone</h2>
                        <form onSubmit={handleCreateSubmit}>
                            {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand</label>
                                <input type="text" id="brand" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, brand: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div> */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand</label>
                                <select
                                    id="brand"
                                    value={selectedSmartphones.brand}
                                    onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, brand: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="" disabled>Select a brand</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Apple">Apple</option>
                                    <option value="Xiaomi">Xiaomi</option>
                                    <option value="Oppo">Oppo</option>
                                    <option value="Vivo">Vivo</option>
                                    <option value="Realme">Realme</option>
                                    <option value="OnePlus">OnePlus</option>
                                    <option value="Asus">Asus</option>
                                    <option value="Sony">Sony</option>
                                    {/* <!-- เพิ่มแบรนด์อื่นๆ ที่ต้องการ --> */}
                                </select>
                            </div>


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">Model Name</label>
                                <input type="text" id="model" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, model: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price (THB)</label>
                                <input type="number" id="price" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, price: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="support5G">5G Support</label>
                                <input type="text" id="support5G" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, support5G: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div> */}
                            <div className="flex items-center gap-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">5G Support</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="support5G"
                                            value="Yes"
                                            checked={selectedSmartphones.support5G === "Yes"}
                                            onChange={(e) =>
                                                setSelectedSmartphones({ ...selectedSmartphones, support5G: e.target.value })
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2 text-gray-500">Yes</span>
                                    </label>

                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="support5G"
                                            value="No"
                                            checked={selectedSmartphones.support5G === "No"}
                                            onChange={(e) =>
                                                setSelectedSmartphones({ ...selectedSmartphones, support5G: e.target.value })
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2 text-gray-500">No</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="processorBrand">Processor Brand (CPU)</label>
                                <input type="text" id="processorBrand" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, processorBrand: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batteryCapacity">Battery Capacity (mAh)</label>
                                <input type="text" id="batteryCapacity" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, batteryCapacity: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ramCapacity">RAM Capacity (GB)</label>
                                <input type="text" id="ramCapacity" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, ramCapacity: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internalMemory">Internal Memory (GB)</label>
                                <input type="text" id="internalMemory" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, internalMemory: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="screenSize">Screen Size (Inch)</label>
                                <input type="text" id="screenSize" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, screenSize: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refreshRate">Refresh Rate</label>
                                <input type="text" id="refreshRate" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, refreshRate: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div> */}
                            {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refreshRate">
                                    Refresh Rate
                                </label>
                                <select
                                    id="refreshRate"
                                    value={selectedSmartphones.refreshRate}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedSmartphones({
                                            ...selectedSmartphones,
                                            refreshRate: value === "Other" ? "" : value,
                                        });
                                    }}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Select Refresh Rate</option>
                                    <option value="60">60 Hz</option>
                                    <option value="90">90 Hz</option>
                                    <option value="120">120 Hz</option>
                                    <option value="144">144 Hz</option>
                                    <option value="Other">Other</option>
                                </select>

                                {selectedSmartphones.refreshRate === "" && (
                                    <input
                                        type="text"
                                        placeholder="Enter custom refresh rate"
                                        value={selectedSmartphones.refreshRate}
                                        onChange={(e) =>
                                            setSelectedSmartphones({ ...selectedSmartphones, refreshRate: e.target.value })
                                        }
                                        className="mt-2 shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    />
                                )} */}
                            {/* </div> */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refreshRate">Refresh Rate (Hz)</label>
                                <select
                                    id="refreshRate"
                                    value={selectedSmartphones.refreshRate}
                                    onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, refreshRate: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="" disabled>Select a number of  Refresh Rate</option>
                                    <option value="60">60 Hz</option>
                                    <option value="90">90 Hz</option>
                                    <option value="120">120 Hz</option>
                                    <option value="144">144 Hz</option>
                                </select>
                            </div>


                            {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="os">Operating System</label>
                                <input type="text" id="os" onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, os: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div> */}
                            <div className="flex items-center gap-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Operating System</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="os"
                                            value="Android"
                                            checked={selectedSmartphones.os === "Android"}
                                            onChange={(e) =>
                                                setSelectedSmartphones({ ...selectedSmartphones, os: e.target.value })
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2 text-gray-500">Android</span>
                                    </label>

                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="os"
                                            value="iOS"
                                            checked={selectedSmartphones.os === "iOS"}
                                            onChange={(e) =>
                                                setSelectedSmartphones({ ...selectedSmartphones, os: e.target.value })
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2 text-gray-500">iOS</span>
                                    </label>
                                </div>
                            </div>




                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseCreateModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Edit Smartphone</h2>
                        <form onSubmit={handleEditSubmit}>
                            {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">ID</label>
                                <input type="text" id="id" value={selectedSmartphones.id}
                                    onChange={(e) => setselectedSmartphones({ ...selectedSmartphones, id: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required disabled />
                            </div> */}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand</label>
                                <select
                                    id="brand"
                                    value={selectedSmartphones.brand}
                                    onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, brand: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="" disabled>Select a brand</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Apple">Apple</option>
                                    <option value="Xiaomi">Xiaomi</option>
                                    <option value="Oppo">Oppo</option>
                                    <option value="Vivo">Vivo</option>
                                    <option value="Realme">Realme</option>
                                    <option value="OnePlus">OnePlus</option>
                                    <option value="Asus">Asus</option>
                                    <option value="Sony">Sony</option>
                                    {/* <!-- เพิ่มแบรนด์อื่นๆ ที่ต้องการ --> */}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">Model</label>
                                <input type="text" id="model" value={selectedSmartphones.model} onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, model: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
                                <input type="number" id="price" value={selectedSmartphones.price} onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, price: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">5G Support</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="support5G"
                                            value="Yes"
                                            checked={selectedSmartphones.support5G === "Yes"}
                                            onChange={(e) =>
                                                setSelectedSmartphones({ ...selectedSmartphones, support5G: e.target.value })
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2 text-gray-500">Yes</span>
                                    </label>

                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="support5G"
                                            value="No"
                                            checked={selectedSmartphones.support5G === "No"}
                                            onChange={(e) =>
                                                setSelectedSmartphones({ ...selectedSmartphones, support5G: e.target.value })
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2 text-gray-500">No</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="processorBrand">Processor Brand</label>
                                <input type="text" id="processorBrand" value={selectedSmartphones.processorBrand} onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, processorBrand: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batteryCapacity">Battery Capacity</label>
                                <input type="text" id="batteryCapacity" value={selectedSmartphones.batteryCapacity} onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, batteryCapacity: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ramCapacity">RAM Capacity</label>
                                <input type="text" id="ramCapacity" value={selectedSmartphones.ramCapacity} onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, ramCapacity: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internalMemory">Internal Memory</label>
                                <input type="text" id="internalMemory" value={selectedSmartphones.internalMemory} onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, internalMemory: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="screenSize">Screen Size</label>
                                <input type="text" id="screenSize" value={selectedSmartphones.screenSize} onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, screenSize: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>

                            {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refreshRate">Refresh Rate</label>
                                <input type="text" id="refreshRate" value={selectedSmartphones.refreshRate} onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, refreshRate: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div> */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refreshRate">Refresh Rate (Hz)</label>
                                <select
                                    id="refreshRate"
                                    value={selectedSmartphones.refreshRate}
                                    onChange={(e) => setSelectedSmartphones({ ...selectedSmartphones, refreshRate: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="" disabled>Select a number of  Refresh Rate</option>
                                    <option value="60">60 Hz</option>
                                    <option value="90">90 Hz</option>
                                    <option value="120">120 Hz</option>
                                    <option value="144">144 Hz</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Operating System</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="os"
                                            value="android"
                                            checked={selectedSmartphones.os === "android"}
                                            onChange={(e) =>
                                                setSelectedSmartphones({ ...selectedSmartphones, os: e.target.value })
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2 text-gray-500">Android</span>
                                    </label>

                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="os"
                                            value="ios"
                                            checked={selectedSmartphones.os === "ios"}
                                            onChange={(e) =>
                                                setSelectedSmartphones({ ...selectedSmartphones, os: e.target.value })
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2 text-gray-500">iOS</span>
                                    </label>
                                </div>
                            </div>

                            <ReCAPTCHA
                                sitekey="6LcOxtIqAAAAAPSbIkZUHs_v4BwwISSkVfirEQVr"
                                onChange={(val) => setCaptcha(val)}
                                className="mb-4"
                            />
                            {/* <ReCAPTCHA
                                sitekey="6LcOxtIqAAAAAPSbIkZUHs_v4BwwISSkVfirEQVr"
                                onChange={(val) => setCaptcha(val)}
                                className="mb-4 flex items-center justify-center"
                                style={{
                                    pointerEvents: brand && model && price && support5G &&  ? "auto" : "none",
                                    opacity: username && password ? 1 : 0.5
                                }}
                            /> */}


                            <div className="flex items-center justify-between">
                                <button
                                    disabled={!captcha}
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCloseEditModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Delete Smartphone</h2>
                        <p>Are you sure you want to delete this smartphone?</p>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                onClick={handleDeleteSubmit}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleCloseDeleteModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}