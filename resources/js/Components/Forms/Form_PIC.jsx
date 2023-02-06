import { CardForm } from "@/Components/CardForm";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export function FormPIC({ title, data, setData, errors }) {
    return (
        <CardForm
            title={title}
            description="Pastikan data yang anda masukkan benar"
        >
            <div>
                <InputLabel for="nik" value="NIK" />

                <TextInput
                    id="nik"
                    type="number"
                    className="block w-full mt-1"
                    value={data.nik}
                    handleChange={(e) => setData("nik", e.target.value)}
                    required
                    autofocus
                    autoComplete="nik"
                />

                <InputError className="mt-2" message={errors.nik} />
            </div>

            <div>
                <InputLabel for="nip" value="NIP" />

                <TextInput
                    id="nip"
                    type="number"
                    className="block w-full mt-1"
                    value={data.nip}
                    handleChange={(e) => setData("nip", e.target.value)}
                    autofocus
                    autoComplete="nip"
                />

                <InputError className="mt-2" message={errors.nip} />
            </div>

            <div>
                <InputLabel for="first_name" value="Firstname" />

                <TextInput
                    id="first_name"
                    className="block w-full mt-1"
                    value={data.first_name}
                    handleChange={(e) => setData("first_name", e.target.value)}
                    required
                    autofocus
                    autoComplete="first_name"
                />

                <InputError className="mt-2" message={errors.first_name} />
            </div>

            <div>
                <InputLabel for="last_name" value="Lastname" />

                <TextInput
                    id="last_name"
                    className="block w-full mt-1"
                    value={data.last_name}
                    handleChange={(e) => setData("last_name", e.target.value)}
                    required
                    autofocus
                    autoComplete="last_name"
                />

                <InputError className="mt-2" message={errors.last_name} />
            </div>

            <div>
                <InputLabel for="title" value="Title" />

                <TextInput
                    id="title"
                    className="block w-full mt-1"
                    value={data.title}
                    handleChange={(e) => setData("title", e.target.value)}
                    autofocus
                    autoComplete="title"
                />

                <InputError className="mt-2" message={errors.title} />
            </div>

            <div>
                <InputLabel for="phone" value="Phone" />

                <TextInput
                    id="phone"
                    type="tel"
                    className="block w-full mt-1"
                    value={data.phone}
                    handleChange={(e) => setData("phone", e.target.value)}
                    required
                    autoComplete="phone"
                />

                <InputError className="mt-2" message={errors.phone} />
            </div>

            <div>
                <InputLabel for="photo">
                    Photo{" "}
                    <span className="inline-block text-sm text-gray-600">
                        (optional)
                    </span>{" "}
                </InputLabel>

                <input
                    id="photo"
                    type="file"
                    accept="image/png"
                    className="mt-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    onChange={(e) => {
                        setData("image_url", e.target.files[0]);
                    }}
                    autoComplete="photo"
                />

                <InputError className="mt-2" message={errors.image_url} />
            </div>
        </CardForm>
    );
}
