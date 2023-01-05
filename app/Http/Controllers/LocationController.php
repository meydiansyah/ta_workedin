<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravolt\Indonesia\IndonesiaService;

class LocationController extends Controller
{
	public function provinces()
	{
		$ind = new IndonesiaService();
		$province = $ind->allProvinces();
		return response()->json([$province]);
	}

	public function cities(Request $request)
	{
		$ind = new IndonesiaService();
		$city = $ind->findProvince($request->id, ['cities'])->cities;
		return response()->json($city);
	}

	public function districts(Request $request)
	{
		$ind = new IndonesiaService();
		$city = $ind->findCity($request->id, ['districts'])->districts;
		return response()->json($city);
	}

	public function villages(Request $request)
	{

		$ind = new IndonesiaService();
		$village = $ind->findDistrict($request->id, ['villages'])->villages;
		return response()->json($village);
	}
}
