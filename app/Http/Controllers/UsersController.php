<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index() {
        $users = User::with(['status', 'role'])->where('id', '!=', auth()->user()->id)->paginate(7);
		return Inertia::render('Admin/User/Index', [
			'users' => $users,
		]);
    }

    public function destroy(User $user) {
        $user->delete();
        return redirect()->route('admin.user');
    }
}
