import { ImFilesEmpty } from "react-icons/im";

export default function EmptyContent({ description }) {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 justify-center flex-col">
                <div className="w-full justify-center flex">
                    <ImFilesEmpty className=" my-6 h-28 w-28 text-gray-500" />
                </div>
                <div className="w-full justify-center flex">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {description}
                    </h2>
                </div>
            </div>
        </div>
    );
}
