<?php

namespace App\Http\Controllers;

use App\Exceptions\UserException;
use App\Models\Response;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function __construct()
    {
    }

    public function create(Request $request)
    {
        $response = new Response();
        try {
            $newUser           = $this->store($request);
            $response->error   = false;
            $response->message = "Usuario Creado Correctamente";
            $response->data    = $newUser;

            return $response->toJSON();

        } catch (\Throwable $th) {
            $response->error   = true;
            $response->message = "Error Interno en el servidor";
            return $response->toJSON();
        }

    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validation->fails()) {
            throw new UserException("{$validation->getMessageBag()->first()} para usuario.");
        }

        $hash           = Hash::make($request->password);
        $user           = new User();
        $user->username = $request->username;
        $user->password = $hash;
        $user->save();
        return $user;
    }

}
