import { ConfirmationModal } from "@/Components/ConfirmationModal";
import DangerButton from "@/Components/DangerButton";
import Footer from "@/Components/Footer";
import InputLabel from "@/Components/InputLabel";
import Navbar from "@/Components/Navbar";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import HeadComponent from "@/Layouts/Head";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import { useState } from "react";
import { MdOutlineMarkEmailRead, MdVerified } from "react-icons/md";

export default function Contact() {
    return (
        <>
            <Head title="workedin - contact us" />
            <Navbar />

            <div className="relative flex-col items-top justify-center bg-white sm:items-center sm:pt-0">
                <HeadComponent title="Contact Us">
                    <div className="flex-col space-y-8 mb-3">
                        <div>
                            <InputLabel
                                className="text-start text-xl"
                                forInput="email"
                                value="Email"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                placeholder="john@workedin.com"
                                // handleChange={onHandleChange}
                            />
                        </div>
                        <div>
                            <InputLabel
                                className="text-start text-xl"
                                forInput="message"
                                value="Your Message"
                            />

                            <textarea
                                id="message"
                                className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"

                                // onChange={(e) =>
                                //     setData("bio", e.target.value)
                                // }
                            />
                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton>Send</PrimaryButton>
                        </div>
                    </div>
                </HeadComponent>
            </div>
            <Footer />
        </>
    );
}
