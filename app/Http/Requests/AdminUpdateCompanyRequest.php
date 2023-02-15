<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminUpdateCompanyRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'unique:companies,name,' . $this->id],
            'email' => ['required', 'email', 'unique:companies,email,' . $this->id],
            'fax' => ['required', 'string', 'unique:companies,fax,' . $this->id],
            'nip' => 'string|unique:pic_companies,nip,' . $this->client_id,
            'phone' => ['required', 'string', 'unique:companies,phone,' . $this->id],
            'type_company_id' => 'required',
            'full_address' => 'required|min:10|max:255',
            'province_id' => 'required|numeric',
            'city_id' => 'required|numeric',
            'district_id' => 'required|numeric',
            'village_id' => 'required|numeric',
            'logo' => [$logo]
        ];
    }
}
