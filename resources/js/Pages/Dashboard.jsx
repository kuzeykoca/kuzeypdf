import {Head} from '@inertiajs/react';
import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import {useState} from "react";
import Processed from "@/Pages/PDF/Processed.jsx";
import Original from "@/Pages/PDF/Original.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Dashboard({fields}) {
    const [currentTab, setCurrentTab] = useState(0)
    const [file, setFile] = useState(null)

    const switchTab = (target) => {
        setCurrentTab(target)
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file)
    };

    return (
        <div className="pt-4">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-row items-center pb-4">
                    <input type="file" className="w-full my-auto"
                           accept="application/pdf"
                           onChange={handleFileUpload}/>
                    {
                        file ? (
                            <PrimaryButton className="text-nowrap"
                                           onClick={() => window.open(URL.createObjectURL(file), '_blank')}>
                                Open in new tab
                            </PrimaryButton>
                        ) : ""
                    }
                </div>
                <Tabs value={currentTab} className="mt-0">
                    <TabsHeader className="bg-gray-700 p-1 md:p-3">
                        <Tab onClick={() => switchTab(0)} value={0}>
                            <div
                                className={`cursor-pointer relative z-20 ${currentTab === 0 ? 'text-gray-800' : 'text-white'}`}>
                                Parsed
                            </div>
                        </Tab>
                        <Tab onClick={() => switchTab(1)} value={1}>
                            <div
                                className={`cursor-pointer relative z-20 ${currentTab === 1 ? 'text-gray-800' : 'text-white'}`}>
                                Original
                            </div>
                        </Tab>
                    </TabsHeader>
                    <TabsBody animate={{
                        initial: {y: 250},
                        mount: {y: 0},
                        unmount: {y: 250},
                    }}>
                        <TabPanel value={0} className="py-4 px-0">
                            <Processed file={file} fields={fields}/>
                        </TabPanel>
                        <TabPanel value={1} className="p-0 pt-4">
                            <Original file={file}/>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
        </div>
    );
}
