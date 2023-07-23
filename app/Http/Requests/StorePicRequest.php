<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePicRequest extends FormRequest
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

        return [
            'email' => 'email|max:255',
			'first_name' => 'required|string|max:255|min:1',
			'last_name' => 'nullable',
			'phone' => 'required|string|max:255|min:1|unique:pic_companies',
			'nik' => 'required|string|max:255|min:1|unique:pic_companies',
			'full_address' => 'required|string',
			'province_id' => 'required|numeric',
			'city_id' => 'required|numeric',
			'district_id' => 'required|numeric',
			'village_id' => 'required|numeric',
            'user_id' => 'numeric',
            'photo' => $photo
        ];
    }
}
