<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage)
                ->subject('WorkedIn - Verify email')
                ->line('Thanks a lot for using workedin application!')
                ->line('Please, click the button below to verify your email address.')
                ->action('Verify Email Address', $url);
        });

        Gate::before(function ($user, $ability) {
            if ($user->role_id === 1) {
                return true;
            }
        });

        Gate::define('client', function (User $user) {
            return $user->role_id === 2;
        });

        Gate::define('freelance', function (User $user) {
            return $user->role_id === 3;
        });
    }
}
