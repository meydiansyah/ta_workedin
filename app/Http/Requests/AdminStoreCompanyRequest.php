<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminStoreCompanyRequest extends FormRequest
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
            'name' => 'required|string|min:3|unique:companies',
            'email' => 'required|string|min:3|unique:companies',
            'phone' => 'required|string|min:3|unique:companies',
            'fax' => 'required|string|min:3|unique:companies',
            'type_company_id' => 'required',
            'full_address' => 'required|min:10|max:255',
            'province_id' => 'required|numeric',
			'city_id' => 'required|numeric',
			'district_id' => 'required|numeric',
			'village_id' => 'required|numeric',
            'logo' => [$logo],
        ];
    }
}
