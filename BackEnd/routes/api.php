<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {

    return $request->user()->only('id', 'name', 'email');
});

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::apiResource('tasks', TaskController::class);
    Route::post('/tasks/{task}/restore', [TaskController::class, 'restore']);

    Route::get('/tasks/trash/deleted/', [TaskController::class, 'deleted']);
    Route::delete('/tasks/{task}/force-delete', [TaskController::class, 'forceDelete']);
    Route::apiResource('categories', CategoryController::class);
});
