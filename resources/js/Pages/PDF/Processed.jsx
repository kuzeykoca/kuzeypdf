import {useEffect, useState} from "react";
import pdfToText from 'react-pdftotext'
export default function Processed({file, fields}){
    const [pdfData, setPdfData] = useState({});

    useEffect(() => {
        if(file){
            pdfToText(file)
                .then(text => {
                    try {
                        const data = extractFields(text);
                        setPdfData(data)
                    }catch (e){
                        console.log(e)
                    }
                })
                .catch(error => console.error("Failed to extract text from pdf"))
        }
    }, [file]);

    const copyToClipBoard = (e, value) => {
        navigator.clipboard.writeText(value)
            .then(() => {
                const status = e.target.nextElementSibling;
                status.textContent = 'Copied';

                setTimeout(()=>{
                    status.textContent = ""
                }, 2000)
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }

    return (
        <div>
            <span className="muted text-sm">
                To copy to clipboard just click any element visible below
            </span>

            <table className="w-full">
                <tbody>
                    {pdfData && Object.entries(pdfData).map(([key, value]) => (
                        <tr key={key} className="mt-4 flex flex-row text-xl items-stretch">
                            <td className="w-1/6 text-left ps-3 py-2 font-black align-middle bg-gray-100 capitalize">
                                {(key.replaceAll('_', " "))}
                            </td>
                            <td className="bg-blue-100 w-4/12 py-2 px-5 align-middle text-left cursor-pointer shadow-md hover:bg-blue-200"
                                    onClick={(e)=>copyToClipBoard(e, value)}>
                                {value}
                            </td>
                            <td className="ms-3 text-green-800 text-sm m-auto"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const extractFields = (text) => {
    const result = {};

    const policyHolderMatch = text.match(/Policy Holder:\s+([A-Z\s,]+)/);
    result.policy_Holder = policyHolderMatch ? policyHolderMatch[1].trim() : null;

    const licenseRegex = /Licence Number:\s*([A-Z]{2};\s*[A-Z0-9]+)\s*Years Licensed:\s*(\d+)/;
    const vinRegex = /VIN:\s*([A-HJ-NPR-Z0-9]{17})/;
    const addressRegex = /Address:\s*([\d\s\w]+\s+\w+\s+\w+)/;
    const claimsIn6YearsRegex = /Claims in the Last 6 years:\s*(\d+)/;
    const yearsClaimFreeRegex = /Years Claim Free:\s*(\d+)/;
    const numberOfClaimsRegex = /Number of Claims:\s*(\d+)/;
    const expensesPaidRegex = /Expenses paid:\s*\$(\d+)/;
    const previousInquiriesRegex = /Previous Inquiries\n((?:.+\n)+)Additional Data Sources/;

    const vinMatch = text.match(vinRegex);
    if (vinMatch) {
        result.vin = vinMatch[1];
    }

    const addressMatch = text.match(addressRegex);
    if (addressMatch) {
        result.address = addressMatch[1];
    }

    const licenseMatch = text.match(licenseRegex);
    if (licenseMatch) {
        const fullLicenseNumber = licenseMatch[1];
        const yearsLicensed = licenseMatch[2];

        const [province, licenseNumber] = fullLicenseNumber.split('; ');

        result.province = province;
        result.license_Number = licenseNumber;
        result.years_Licensed = yearsLicensed;
    }

    const yearsInsuredMatch = text.match(/Years Insured on AutoPlus™:\s+(\d+)/);
    result.years_Insured = yearsInsuredMatch ? yearsInsuredMatch[1].trim() : null;

    const claimsIn6YearsMatch = text.match(claimsIn6YearsRegex);
    if (claimsIn6YearsMatch) {
        result.claims_In_6_Years = claimsIn6YearsMatch[1];
    }

    const yearsClaimFreeMatch = text.match(yearsClaimFreeRegex);
    if (yearsClaimFreeMatch) {
        result.years_Claim_Free = yearsClaimFreeMatch[1];
    }

    const numberOfClaimsMatch = text.match(numberOfClaimsRegex);
    if (numberOfClaimsMatch) {
        result.number_Of_Claims = numberOfClaimsMatch[1];
    }

    const expensesPaidMatch = text.match(expensesPaidRegex);
    if (expensesPaidMatch) {
        result.expenses_Paid = expensesPaidMatch[1];
    }

    const previousInquiriesMatch = text.match(previousInquiriesRegex);
    if (previousInquiriesMatch) {
        result.previous_Inquiries = previousInquiriesMatch[1].trim().split('\n').map(line => line.trim());
    }

    return result;
}
