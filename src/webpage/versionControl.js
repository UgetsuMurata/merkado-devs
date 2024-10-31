import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getUpdatesData, setUpdatesData } from '../firebase';
import { images } from '../GLOBAL_VARIABLES';

export default function VersionControl() {
    const [currentUpdatesData, setCurrentUpdatesData] = useState();
    const [newUpdatesVersion, setNewUpdatesVersion] = useState();
    const [newUpdatesUrl, setNewUpdatesUrl] = useState();
    const [hasChanges, setHasChanges] = useState();

    useEffect(() => {
        getUpdatesData((retrievedData) => {
            setCurrentUpdatesData(retrievedData);
            setNewUpdatesVersion(retrievedData.version);
            setNewUpdatesUrl(retrievedData.url);
        });
    }, []);

    useEffect(() => {
        setHasChanges(newUpdatesVersion !== currentUpdatesData?.version || newUpdatesUrl !== currentUpdatesData?.url);
    }, [newUpdatesVersion, newUpdatesUrl,currentUpdatesData?.version, currentUpdatesData?.url]);

    return (
        <Sidebar>
            <div className="flex flex-grow">
                <div className="flex-grow p-4 flex justify-center items-center relative">
                    <div className="flex flex-col items-center min-h-screen w-full mt-6 mx-12">
                        {/** HEADER */}
                        <div className='mb-4 w-full bg-theme-orange rounded-lg p-2'>
                            <p className='text-theme-white ms-2'>Version Control</p>
                        </div>
                        {/** CURRENT VERSION INPUT */}
                        <div className="mb-4 w-11/12">
                            <label className="block text-black font-semibold mb-2">Current Version</label>
                            <input
                                type="text"
                                value={newUpdatesVersion ? newUpdatesVersion : ""}
                                onChange={(event) => setNewUpdatesVersion(event.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-theme-pink text-black focus:outline-none focus:ring-2 focus:ring-red-400"
                                placeholder="Enter current version"
                            />
                        </div>

                        {/** LINK INPUT */}
                        <div className="mb-6 w-11/12">
                            <label className="block text-black font-semibold mb-2">Link</label>
                            <input
                                type="text"
                                value={newUpdatesUrl ? newUpdatesUrl : ""}
                                onChange={(event) => setNewUpdatesUrl(event.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-theme-pink text-black focus:outline-none focus:ring-2 focus:ring-red-400"
                                placeholder="Enter link"
                            />
                        </div>

                        {/** BUTTONS */}
                        {
                            hasChanges &&
                            <div className="flex justify-center gap-4 mb-10">
                                <button className="px-4 py-2 rounded-lg bg-theme-pink text-black font-semibold hover:bg-theme-light-pink transition"
                                    onClick={() => {
                                        setNewUpdatesUrl(currentUpdatesData.url);
                                        setNewUpdatesVersion(currentUpdatesData.version);
                                    }}>
                                    Cancel
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-theme-dark-pink text-black font-semibold hover:bg-theme-dark-light-pink transition"
                                    onClick={() => {
                                        setUpdatesData({
                                            url: newUpdatesUrl,
                                            version: newUpdatesVersion
                                        })
                                    }}>
                                    Save Changes
                                </button>
                            </div>
                        }

                        {/** SOLID ICON */}
                        <img className='w-6 h-6' src={images.NIBBLES_SOLID.src} alt={images.NIBBLES_SOLID.alt} />
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}
