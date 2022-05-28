<?php

namespace App\Http\Controllers;

use App\Models\Response;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ["login"]]);
    }

    public function login(Request $request)
    {

        $response = new Response();
        try {
            $credentials = $request->only("username", "password");
            $validation  = Validator::make($credentials, [
                'username' => 'required',
                'password' => 'required',
            ]);

            if ($validation->fails()) {
                $response->error   = true;
                $response->message = $validation->getMessageBag()->first();
                $response->data    = null;
                return $response->toJSON();
            }

            if (!$token = Auth::attempt($credentials)) {
                $response->error   = true;
                $response->message = "Usuario y contraseña incorrectos";
                $response->data    = null;
                return $response->toJSON();
            }

            $user           = Auth::user();
            $response->data = ["token" => $token, "user" => $user];

            return $response->toJSON();

        } catch (\Throwable $th) {
            $response->error   = true;
            $response->message = "Error Interno en el servidor" . $th->getMessage();
            return $response->toJSON();
        }

    }

    public function logout()
    {
        $response = new Response();
        try {
            Auth::logout();
            $response->error   = false;
            $response->message = "Se cerro la sesión con exito";
            return $response->toJSON();
        } catch (\Throwable $th) {
            $response->error   = true;
            $response->message = "Error Interno en el servidor";
            return $response->toJSON();
        }
    }

    public function me()
    {
        $response = new Response();
        try {
            $response->error = false;
            $user            = Auth::user();
            $response->data  = $user->person;

            return $response->toJSON();
        } catch (\Throwable $th) {

            $response->error   = true;
            $response->message = "Error interno en el servidor";
            return $response->toJSON();
        }
    }
}
