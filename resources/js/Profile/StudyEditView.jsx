import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "react-select";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

export default function StudyEdit({
    universities,
    majors,
    freelance,
    tapBack,
}) {
    const { data, setData, patch, errors, wasSuccessful } = useForm({
        pt_code: freelance.pt_code ?? Number,
        major_id: freelance.major_id ?? Number,
        nim: freelance.nim ?? String,
    });

    const [selectedPt, setSelectedPt] = useState(false);

    const listUniversity = universities.map((item) => {
        return {
            value: item.codept,
            label: item.codept + " - " + item.name,
        };
    });

    const listMajor = majors
        .filter((items) => items.pt_code.includes(data.pt_code))
        .map((item) => {
            return {
                value: item.id,
                label: item.code + " - " + item.name,
            };
        });

    useEffect(() => {
        if (freelance.university) {
            setSelectedPt(true);
        }
        if (wasSuccessful) {
            tapBack();
        }
    }, [wasSuccessful]);

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        patch(route("profile.university.update", freelance.id));

        // tapBack();
    };

    return (
        <form onSubmit={submit} className="flex-col space-y-6">
            <div className="grid md:grid-cols-8 md:space-x-4 md:space-y-0 space-y-2 p-4">
                <div
                    className={`${
                        selectedPt ? "md:col-span-2" : "md:col-span-8"
                    }`}
                >
                    <InputLabel for="university" value="Universitas" />
                    <Select
                        isClearable
                        options={listUniversity}
                        className="mt-2 basic-single"
                        defaultValue={
                            freelance.university && [
                                {
                                    value: freelance.university.id,
                                    label: freelance.university.name,
                                },
                            ]
                        }
                        classNamePrefix="select"
                        onChange={(e) => {
                            setData("pt_code", e.value);
                            setSelectedPt(true);
                        }}
                    />
                </div>
                {selectedPt && (
                    <>
                        <div className="md:col-span-4">
                            <InputLabel for="nim" value="NIM" />

                            <TextInput
                                id="nim"
                                type="number"
                                className="block w-full mt-1"
                                value={data.nim}
                                handleChange={(e) =>
                                    setData("nim", e.target.value)
                                }
                                required
                                autoComplete="nim"
                            />

                            <InputError className="mt-2" message={errors.nim} />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel for="major" value="Jurusan" />

                            <Select
                                isClearable
                                id="major"
                                options={listMajor}
                                defaultValue={
                                    freelance.major && [
                                        {
                                            value: freelance.major.id,
                                            label: freelance.major.name,
                                        },
                                    ]
                                }
                                className="mt-2 basic-single"
                                classNamePrefix="select"
                                onChange={(e) => {
                                    setData("major_id", e.value);
                                    setSelectedPt(true);
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="flex">
                <PrimaryButton className="ml-auto inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                    Simpan
                </PrimaryButton>
            </div>
        </form>
    );
}
