import { CardForm } from "@/Components/CardForm";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export function FormCompany({ data, setData, errors }) {
    return (
        <CardForm
            title="Data Perusahaan"
            description="Pastikan data yang anda masukkan benar"
        >
            <div>
                <InputLabel for="name" value="Nama Perusahaan" />

                <TextInput
                    id="name"
                    className="block w-full mt-1"
                    value={data.name}
                    handleChange={(e) => setData("name", e.target.value)}
                    autofocus
                    autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    className="block w-full mt-1"
                    value={data.email}
                    handleChange={(e) => setData("email", e.target.value)}
                    autofocus
                    autoComplete="email"
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            <div>
                <InputLabel for="fax" value="Faximile" />

                <TextInput
                    id="fax"
                    type="number"
                    className="block w-full mt-1"
                    value={data.fax}
                    handleChange={(e) => setData("fax", e.target.value)}
                    autofocus
                    autoComplete="fax"
                />

                <InputError className="mt-2" message={errors.fax} />
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
                        setData("logo", e.target.files[0]);
                    }}
                    autoComplete="photo"
                />

                <InputError className="mt-2" message={errors.logo} />
            </div>
        </CardForm>
    );
}
