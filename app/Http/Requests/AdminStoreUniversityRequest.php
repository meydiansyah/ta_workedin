<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminStoreUniversityRequest extends FormRequest
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
        if($this->hasFile('logo')) {
            $logo = ['image', 'file', 'max:10240'];
        } else {
            $logo = ['string'];
        }
        return [
            'codept' => 'required|string|max:255|min:1|unique:universities',
			'name' => 'required|string|max:255|min:1|unique:universities',
			'email' => 'required|string|max:255|min:1|unique:universities',
			'phone' => 'required|string|max:255|min:1|unique:universities',
			'fax' => 'required|string|max:255|min:1|unique:universities',
			'url' => 'required|string|max:255|min:1|unique:universities',
			'full_address' => 'required|string',
			'province_id' => 'required|numeric',
			'city_id' => 'required|numeric',
			'district_id' => 'required|numeric',
			'village_id' => 'required|numeric',
			'logo' => [$logo],
        ];
    }
}
