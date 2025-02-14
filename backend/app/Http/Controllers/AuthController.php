<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (! $token = Auth::attempt($request->validated())) {
            throw ValidationException::withMessages(['email' => ['Invalid email and password.']]);
        }

        return $this->respondWithToken($token, Auth::user());
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        $token = Auth::attempt($request->validated());

        return $this->respondWithToken($token, $user);
    }

    public function me(): JsonResponse
    {
        return response()->json(Auth::user());
    }

    public function logout(): JsonResponse
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(Auth::refresh(), Auth::user());
    }

    protected function respondWithToken(string $token, User $user): JsonResponse
    {
        return response()->json([
            'accessToken' => $token,
            'tokenType' => 'bearer',
            'expiresIn' => Auth::factory()->getTTL() * 60,
            'user' => $user
        ]);
    }
}
