import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getErrorData, resolveError } from '../firebase';

export default function Bugs() {
    const [errorData, setErrorDataState] = useState(null);
    const [showResolved, setShowResolved] = useState(true);
    useEffect(() => {
        getErrorData((retrievedData) => {
            setErrorDataState(retrievedData);
        });
    }, []);

    const handleSelectAllChange = () => {
        const newSelectAll = !showResolved;
        setShowResolved(newSelectAll);
    };

    const handleCheckboxChange = (index) => {
        // Toggle the 'resolved' status in the local state
        const updatedErrorData = errorData.map((item, idx) =>
            idx === index ? { ...item, resolved: !item.resolved } : item
        );

        // Update the state to reflect the change immediately
        setErrorDataState(updatedErrorData);

        // Update the backend with the new 'resolved' status
        resolveError(index, !errorData[index].resolved);
    };

    return (
        <Sidebar>
            <div className="flex flex-grow">
                <div className="flex-grow p-4 flex justify-center items-center relative">
                    <div className="relative h-full w-full flex flex-col justify-center items-center">
                        {/** SELECT ALL CHECKBOX */}
                        <div className="w-full mb-4 flex p-4 rounded-lg bg-theme-orange">
                            <p className='me-4 text-theme-white font-semibold'>Show All</p>
                            <input type="checkbox" checked={showResolved} onChange={handleSelectAllChange} className="w-6 h-6" />
                        </div>

                        {/** ERROR TABLE */}
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-theme-orange">
                                <tr>
                                    <th className="px-4 py-2 text-theme-white" scope='col'>No</th>
                                    <th className="px-4 py-2 text-theme-white" scope='col'>Timestamp</th>
                                    <th className="px-4 py-2 text-theme-white" scope='col'>Account Reported</th>
                                    <th className="px-4 py-2 text-theme-white" scope='col'>Error Location</th>
                                    <th className="px-4 py-2 text-theme-white" scope='col'>Error Message</th>
                                    <th className="px-4 py-2 text-theme-white" scope='col'>Resolved</th>
                                </tr>
                            </thead>
                            <tbody>
                                {errorData ?
                                    errorData.map((item, index) => {
                                        const data = extractData(item.message);
                                        return (
                                            !(showResolved && item.resolved) &&
                                            <tr key={item.id} className={((index % 2) === 0 ? "bg-theme-pink hover:bg-theme-light-pink " : "bg-theme-white hover:bg-gray-50")}>
                                                <td className="text-xs px-4 py-3">
                                                    {index}
                                                </td>
                                                <td className="text-xs px-4 py-3">
                                                    {convertEpochToDate(item.timestamp)}
                                                </td>
                                                <td className="text-xs px-4 py-3">
                                                    {data.account}
                                                </td>
                                                <td className="text-xs px-4 py-3">
                                                    {data.location}
                                                </td>
                                                <td className="text-xs px-4 py-3">
                                                    {data.message}
                                                </td>
                                                <td className="text-xs px-4 py-3">
                                                    <input checked={item.resolved || false}
                                                        type="checkbox"
                                                        className='w-8 h-8'
                                                        onChange={() => handleCheckboxChange(index)} />
                                                </td>
                                            </tr>
                                        );
                                    })
                                    :
                                    "No errors found."
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}

function convertEpochToDate(epochMilliseconds) {
    const date = new Date(epochMilliseconds);
    const options = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    return date.toLocaleString('en-US', options);
}

function extractData(inputString) {
    const regex = /\[\s*(.*?)\s*\] at \[\s*(.*?)\s*\] by \[\s*(.*?)\s*\]/;
    const matches = inputString.match(regex);

    if (matches) {
        const message = matches[1];
        const location = matches[2];
        const account = matches[3];

        return { message, location, account };
    } else {
        console.error("Input string is not in the expected format.");
        return null;
    }
}