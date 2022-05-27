<?php

namespace App\Http\Controllers;

use App\Exceptions\PersonException;
use App\Models\Person;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PersonController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
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
            $response->message = "Error Interno en el servidor" . $th->getMessage();
            return $response->toJSON();
        }

    }

    private function store(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'name'                => 'required',
            'last_name'           => 'required',
            'identification_type' => 'required',
            'identification'      => 'required',
            'date_of_birth'       => 'required',

        ]);

        if ($validation->fails()) {
            throw new PersonException("{$validation->getMessageBag()->first()} para persona.");
        }

        $person = new Person();

        $person->fill($request->all());

        $requestUser    = new Request($request = $request->input("user"));
        $userController = new UserController();

        $user = $userController->store($requestUser);

        $person->user_id = $user->id;
        $person->save();

        return $person;

    }
    public function edit(Person $person, Request $request)
    {
        $response = new Response();
        try {
            $oldPerson = $person;
            if ($oldPerson == null) {
                $response->error   = true;
                $response->message = "La persona no existe";
                return $response->toJSON();
            }

            $person = $this->update($oldPerson, $request);

            $response->error   = false;
            $response->message = "Perosna editado correctamente.";

            return $response->toJSON();

        } catch (\Throwable $th) {
            $response->error   = true;
            $response->message = "Error Interno en el servidor";
            return $response->toJSON();
        }

    }

    private function update(Person $person, Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name'                => 'required',
            'last_name'           => 'required',
            'identification_type' => 'required',
            'identification'      => 'required',
            'date_of_birth'       => 'required',

        ]);
        if ($validation->fails()) {
            throw new PersonException("{$validation->getMessageBag()->first()} para persona.");
        }

        $data = $request->only([
            'name',
            'last_name',
            'identification_type',
            'identification',
            'date_of_birth',
        ]);

        $personModel = new Person();
        $personModel = $person;
        $personModel->update($data);

        return $person;

    }

    public function delete(Person $person)
    {

        $response = new Response();
        try {
            $person->delete();
            $response->error   = false;
            $response->message = "Perosna editado correctamentesona elminada correctamente";
            return $response->toJSON();
        } catch (\Throwable $th) {
            $response->error   = true;
            $response->message = "Error Interno en el servidor";
            return $response->toJSON();
        }
    }
    public function get(Person $person)
    {

        $response = new Response();
        try {

            $response->error   = false;
            $response->data    = $person;
            $response->message = "Perosna editado correctamentesona elminada correctamente";
            return $response->toJSON();
        } catch (\Throwable $th) {
            $response->error   = true;
            $response->message = "Error Interno en el servidor";
            return $response->toJSON();
        }
    }

    function list(Request $request) {
        try {

            $persons = [];
            $query   = "";

            if (isset($request->all()['query'])) {
                $query = $request->all()['query'];
            }

            switch ($request->type) {
                case "name":
                    $persons = DB::table("persons")
                        ->where("name", 'LIKE', "{$query}%")
                        ->select('persons.*')
                        ->simplePaginate(5);
                    break;
                case "last_name":
                    $persons = DB::table("persons")
                        ->where("last_name", 'LIKE', "{$query}%")
                        ->select('persons.*')
                        ->simplePaginate(5);

                    break;
                case "identification_type":
                    $persons = DB::table("persons")
                        ->where("identification_type", 'LIKE', "{$query}%")
                        ->select('persons.*')
                        ->simplePaginate(5);

                    break;
                case "identification":
                    $persons = DB::table("persons")
                        ->where("identification", 'LIKE', "{$query}%")
                        ->select('persons.*')
                        ->simplePaginate(5);

                    break;
                default:
                    $persons = DB::table("persons")
                        ->select('persons.*')
                        ->simplePaginate(5);

                    break;
            }
            return $persons;

        } catch (\Throwable $th) {
            $response          = new Response();
            $response->error   = true;
            $response->message = "Error Interno en el servidor";
            return $response->toJSON();
        }
    }

    public function listPersons()
    {

        $response = new Response();
        try {
            $persons         = new Person();
            $response->error = false;
            $response->data  = $persons->get();

            return $response->toJSON();
        } catch (\Throwable $th) {

            $response->error   = true;
            $response->message = "Error Interno en el servidor";
            return $response->toJSON();
        }
    }

}
