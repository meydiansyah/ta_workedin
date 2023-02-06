import { CardForm } from "@/Components/CardForm";
import InputLabel from "@/Components/InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";

export function FormUser({ data, setData, errors }) {
    return (
        <CardForm
            title="Profile Information"
            description="Create account's profile information and email address."
        >
            <div>
                <InputLabel for="name" value="Username" />

                <TextInput
                    id="name"
                    className="block w-full mt-1"
                    value={data.name}
                    handleChange={(e) => setData("name", e.target.value)}
                    required
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
                    required
                    autofocus
                    autoComplete="email"
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            <div>
                <InputLabel for="password" value="Passowrd" />

                <TextInput
                    id="password"
                    type="password"
                    className="block w-full mt-1"
                    value={data.password}
                    handleChange={(e) => setData("password", e.target.value)}
                    required
                    autoComplete="password"
                />

                <InputError className="mt-2" message={errors.password} />
            </div>
        </CardForm>
    );
}
