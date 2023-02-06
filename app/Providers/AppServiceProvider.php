<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Gate::define('isAdmin', function(User $user) {
        //     return $user->role->id === 1;
        // });

        // Gate::define('clients', function(User $user) {
        //     return $user->role->id === 1;
        // });

        // Gate::define('freelances', function(User $user) {
        //     return $user->role->id === 1;
        // });
    }
}
