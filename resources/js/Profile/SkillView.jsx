import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { MdOutlineDesignServices, MdSchool } from "react-icons/md";
import StudyEdit from "./StudyEditView";
import { FiExternalLink } from "react-icons/fi";
import Select from "react-select";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/inertia-react";

export default function SkillView({ data, skills, toProfile }) {
    const { setData, patch, wasSuccessful } = useForm({
        freelance_id: data.id,
        skill: data.skills && data.skills.map((e) => e.id),
    });
    const [edit, setEdit] = useState(false);
    const listSkill = skills.map((item) => {
        return {
            value: item.id,
            label: item.name,
        };
    });

    useEffect(() => {
        if (wasSuccessful) {
            setEdit(false);
        }
    }, [wasSuccessful]);

    const submit = (e) => {
        e.preventDefault();

        patch(route("freelance.update.skills"));
        // setEdit(false);
    };

    return (
        <div className=" bg-white rounded-lg p-6">
            <div className="flex-col space-y-6">
                {!data.user ? (
                    <div className="rounded-md p-4 flex justify-between items-centerbg-yellow-100 text-yellow-700">
                        <div className="flex items-center">
                            <BiInfoCircle
                                size={20}
                                className="text-yellow-700"
                            />
                            <span className="ml-4">
                                Data freelance belum lengkap
                            </span>
                        </div>
                        <button
                            type="button"
                            className="font-medium"
                            onClick={toProfile}
                        >
                            Lengkapi
                        </button>
                    </div>
                ) : (
                    <>
                        {data.skills.length === 0 ? (
                            <div
                                className={`rounded-md p-4 flex justify-between items-center ${
                                    !edit && "bg-yellow-100"
                                }`}
                            >
                                <div className="flex items-center">
                                    <BiInfoCircle
                                        size={20}
                                        className="text-yellow-700"
                                    />
                                    <span className="ml-4 text-yellow-700">
                                        Anda belum menambahkan keterampilan
                                    </span>
                                </div>
                                {edit ? (
                                    <button
                                        type="button"
                                        className="font-medium"
                                        onClick={() => {
                                            setEdit(false);
                                        }}
                                    >
                                        Batal
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="font-medium text-yellow-700"
                                        onClick={() => {
                                            setEdit(true);
                                        }}
                                    >
                                        Lengkapi
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex-col space-y-4">
                                <div
                                    className={`flex justify-between p-4 rounded-md ${
                                        edit && "bg-gray-100"
                                    }`}
                                >
                                    <div className="flex space-x-4 items-center">
                                        <MdOutlineDesignServices size={20} />
                                        <div className="text-lg font-semibold">
                                            Keterampilan
                                        </div>
                                    </div>
                                    {edit ? (
                                        <button
                                            type="button"
                                            className="font-medium"
                                            onClick={() => {
                                                setEdit(false);
                                            }}
                                        >
                                            Batal
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="font-medium text-green-800"
                                            onClick={() => {
                                                setEdit(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                        {edit ? (
                            <form onSubmit={submit}>
                                <InputLabel for="skill" value="Skill" />
                                <div className="flex space-x-4 items-center">
                                    <div className="w-full">
                                        <Select
                                            isMulti
                                            id="skill"
                                            options={listSkill}
                                            defaultValue={
                                                data.user &&
                                                data.skills.map((e) => {
                                                    return {
                                                        value: e.id,
                                                        label: e.name,
                                                    };
                                                })
                                            }
                                            className="mt-2"
                                            onChange={(e) => {
                                                const __list = [];
                                                e.map(({ value }) =>
                                                    __list.push(value)
                                                );
                                                setData("skill", __list);
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="font-medium text-blue-600"
                                        // onClick={() => {
                                        //     setEdit(true);
                                        // }}
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex-col space-y-4">
                                <div className="ml-8">
                                    <ol className="list-decimal ml-4">
                                        {data.skills.map((e) => {
                                            return <li key={e.id}>{e.name}</li>;
                                        })}
                                    </ol>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
