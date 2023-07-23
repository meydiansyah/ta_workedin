import { CardForm } from "@/Components/CardForm";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Select from "react-select";

export function FormUniversity({
    data,
    setData,
    errors,
    freelance,
    universities,
    majors,
}) {
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
        if (freelance && freelance.university) {
            setSelectedPt(true);
        }
    });
    return (
        <CardForm
            title="Data Universitas"
            description={
                <>
                    Lengkapi data universitas sesuai dengan :{" "}
                    <Link
                        href="https://pddikti.kemdikbud.go.id"
                        className="text-blue-500 underline"
                    >
                        https://pddikti.kemdikbud.go.id
                    </Link>
                </>
            }
        >
            <div>
                <InputLabel for="university" value="Universitas" />
                <Select
                    isClearable
                    options={listUniversity}
                    className="mt-2 basic-single"
                    defaultValue={
                        freelance &&
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
                    <div>
                        <InputLabel for="major" value="Jurusan" />

                        <Select
                            isClearable
                            id="major"
                            options={listMajor}
                            defaultValue={
                                freelance &&
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
                    <div>
                        <InputLabel for="nim" value="NIM" />

                        <TextInput
                            id="nim"
                            type="number"
                            className="block w-full mt-1"
                            value={data.nim}
                            handleChange={(e) => setData("nim", e.target.value)}
                            required
                            autoComplete="nim"
                        />

                        <InputError className="mt-2" message={errors.nim} />
                    </div>
                </>
            )}
        </CardForm>
    );
}
