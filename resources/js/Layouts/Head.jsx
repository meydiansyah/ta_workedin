export default function HeadComponent({
    title,
    subTitle = true,
    description,
    children,
}) {
    return (
        <section>
            <div className="w-full px-3 mt-20 py-16 antialiased bg-white lg:px-6 flex items-center justify-center ">
                <div className="mx-auto max-w-5xl center">
                    <div className="container py-auto mx-auto text-center sm:px-4 ">
                        <h1 className="text-3xl font-semibold leading-10 tracking-tight sm:text-4xl sm:leading-none md:text-4xl xl:text-5xl">
                            <div className="block my-6">
                                <span className="my-6 font-extrabold">
                                    {title}
                                </span>
                            </div>
                            {subTitle && (
                                <span className="inline-block relative">
                                    Portal Kerja Lepas Mahasiswa
                                </span>
                            )}
                        </h1>
                        <div className="max-w-lg mx-auto mt-6 text-sm text-center text-black md:mt-12 sm:text-base md:max-w-xl md:text-lg xl:text-xl">
                            {children}
                            <span className="block">{description}</span>{" "}
                            <span className="font-extrabold">Worked</span>{" "}
                            <span className="font-extrabold text-[#3C7E5B]">
                                [in]
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
