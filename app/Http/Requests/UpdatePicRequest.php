<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if($this->hasFile('photo')) {
            $photo = ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'];
        } else {
            $photo = ['string'];
        }

        $data = [
            // 'first_name' => ['required', 'stirng', 'max:255', 'min:1', 'unique:pic_companies,first_name,'.$this->id],
            'first_name' => 'required|string|max:255|min:1|unique:pic_companies,first_name,' . $this->id,
            'last_name' => 'required|string|max:255|min:1|unique:pic_companies,last_name,' . $this->id,
            'phone' => 'required|string|max:255|min:1|unique:pic_companies,phone,' . $this->id,
            'nik' => 'required|string|max:255|min:1|unique:pic_companies,nik,' . $this->id,
            'nip' => 'string|max:255|min:1|unique:pic_companies,nip,' . $this->id,
            'title' => 'string',
            'company_id' => 'numeric|unique:pic_companies,company_id,' . $this->id,
            'full_address' => 'required|string',
            'province_id' => 'required|numeric',
            'city_id' => 'required|numeric',
            'district_id' => 'required|numeric',
            'village_id' => 'required|numeric',
            'user_id' => 'numeric',
            'email' => 'email|unique:users,email,' . $this->user_id,
            'photo' => $photo,
        ];
        // dd($this->id);
        return $data;
    }
}
