<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Contracts\LogoutResponse;
use Laravel\Fortify\Contracts\RegisterResponse;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->instance(RegisterResponse::class, new class implements RegisterResponse {
            public function toResponse($request)
            {

                $user = User::where('email', $request->email)->first();

                return
                    response()->json([
                        'message' => 'Registration successful',
                        'token' => $user->createToken($request->email)->plainTextToken,
                    ], 200);
            }
        });
        // Custom Login Response
        $this->app->instance(LoginResponse::class, new class implements LoginResponse {
            public function toResponse($request): JsonResponse
            {
                if (Auth::attempt($request->only('email', 'password'))) {
                    $user = User::where('email', $request->email)->first();

                    return response()->json([
                        "message" => "You are successfully logged in",
                        "token" => $user->createToken($request->email)->plainTextToken,
                    ], 200);
                }
                $user = User::where('email', $request->email)->first();


                if ($user->tokens()->count() > 0) {

                    $user = User::where('email', $request->email)->first();

                    $user->tokens()->delete();
                    return response()->json([
                        "message" => "You are successfully re-logged in",
                        "token" => $user->createToken($request->email)->plainTextToken,
                    ], 200);
                }



                $user->tokens()->delete();
                return response()->json([
                    "message" => "You are successfully logged in",
                    "token" => $user->createToken($request->email)->plainTextToken,
                ], 200);
            }
        });

        // Custom Logout Response
        $this->app->instance(LogoutResponse::class, new class implements LogoutResponse {

            public function toResponse($request): JsonResponse
            {
                // Ensure user is logged out and delete the current access token

                //get tokens with user email and delete them

                $user = User::where('email', $request->email)->first();
                $user->tokens()->delete();


                // Return a JSON response confirming logout
                return response()->json(['message' => 'You have been successfully logged out.'], 200);
            }
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });



        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}
