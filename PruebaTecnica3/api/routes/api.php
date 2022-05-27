<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PersonController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::group([
    'middleware' => 'api',
    'prefix'     => 'auth',
], function ($router) {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
}
);

Route::group([
    'middleware' => 'api',
    'prefix'     => 'person',
], function ($router) {
    Route::post('create', [PersonController::class, 'create'])->name('create');
    Route::put('edit/{person}', [PersonController::class, 'edit'])->name('edit');
    Route::delete('delete/{person}', [PersonController::class, 'delete'])->name('delete');
    Route::get('{person}', [PersonController::class, 'get'])->name('get');
    Route::get('pagination', [PersonController::class, 'list'])->name('list');
    Route::get('', [PersonController::class, 'listPersons'])->name('listPersons');
}
);
