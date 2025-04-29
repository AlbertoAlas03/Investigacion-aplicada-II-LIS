<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CuponController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//rutas publicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//rutas privadas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/getCupon', [CuponController::class, 'getCupon']);
    Route::post('/getCuponByCode', [CuponController::class, 'getCuponByCode']);
    Route::post('/canjear', [CuponController::class, 'CanjearCupon']);
    Route::post('/addCupon', [CuponController::class, 'addCupon']);
    Route::post('/deleteCupon', [CuponController::class, 'deleteCupon']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/updateCupon', [CuponController::class, 'UpdateCupon']);
});
