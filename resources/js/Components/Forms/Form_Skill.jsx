import { CardForm } from "@/Components/CardForm";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";

export function FormSkill({ setData, user, skills }) {
    const listSkill = skills.map((item) => {
        return {
            value: item.id,
            label: item.name,
        };
    });
    return (
        <CardForm
            title="Pilih Kemampuan"
            description="Tentukan kemampuan yang akan kamu berikan kepada pencari kerja"
        >
            <div>
                <InputLabel for="skill" value="Skill" />
                <Select
                    isMulti
                    id="skill"
                    options={listSkill}
                    defaultValue={
                        user &&
                        user.skills.map((e) => {
                            return {
                                value: e.id,
                                label: e.name,
                            };
                        })
                    }
                    className="mt-2"
                    onChange={(e) => {
                        const __list = [];
                        e.map(({ value }) => __list.push(value));
                        setData("skill", __list);
                    }}
                />
            </div>
        </CardForm>
    );
}
