<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class AdminUpdateUniversityRequest extends FormRequest
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
            'codept' => ['required', 'min:3', Rule::unique('universities')->ignore($this->codept, 'codept')],
            'name' => ['required', 'string', Rule::unique('universities')->ignore($this->codept, 'codept')],
			'email' => ['required', 'email', Rule::unique('universities')->ignore($this->codept, 'codept')],
            'fax' => ['required', 'string', Rule::unique('universities')->ignore($this->codept, 'codept')],
            'phone' => ['required', 'string', Rule::unique('universities')->ignore($this->codept, 'codept')],
			'url' => ['required', 'url', Rule::unique('universities')->ignore($this->codept, 'codept')],
			'full_address' => ['required', 'string', Rule::unique('universities')->ignore($this->codept, 'codept')],
			'province_id' => ['required', 'numeric'],
			'city_id' => ['required', 'numeric'],
			'district_id' => ['required', 'numeric'],
			'village_id' => ['required', 'numeric'],
			'logo' => [$logo],
        ];
    }
}
