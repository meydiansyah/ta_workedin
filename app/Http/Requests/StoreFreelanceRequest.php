<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFreelanceRequest extends FormRequest
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
        return [
            'first_name' => 'required|string|max:255|min:1',
			'last_name' => 'string|max:255',
			'phone' => 'required|string|max:255|min:1|unique:freelances',
			'bio' => 'string|max:255',
			'nik' => 'required|string|max:255|min:1|unique:freelances',
			'full_address' => 'required|string',
			'province_id' => 'required|numeric',
			'city_id' => 'required|numeric',
			'district_id' => 'required|numeric',
			'village_id' => 'required|numeric',
            'email' => 'string',
            'user_id' => 'numeric'
        ];
    }
}
