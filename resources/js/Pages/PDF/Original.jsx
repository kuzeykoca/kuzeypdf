import * as pdfjs from "pdfjs-dist";
import pdfJSWorkerURL from "pdfjs-dist/build/pdf.worker.mjs?url";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

// Set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = pdfJSWorkerURL;

export default function Original({ file }) {
    const height = () => {
        return window.innerHeight - (parseFloat(getComputedStyle(document.documentElement).fontSize) * 3) - 90
    }
    function get100vhInPixels() {
        return window.innerHeight;
    }
    return (
        <div style={{ height: `${height()}px`}}>
            {file && (
                <iframe src={`${URL.createObjectURL(file)}#view=FitH&navpanes=0&scrollbar=0`}
                        width="100%"
                        height="100%"
                        title="pdf"
                        style={{ border: "none" }}/>
            )}
        </div>
    );
}
