<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/fields', [\App\Http\Controllers\FieldController::class, 'index'])->name('fields.index');
    Route::post('/fields', [\App\Http\Controllers\FieldController::class, 'store'])->name('fields.store');
    Route::post('/fields/update', [\App\Http\Controllers\FieldController::class, 'update'])->name('fields.update');
    Route::delete('/fields', [\App\Http\Controllers\FieldController::class, 'delete'])->name('fields.delete');
});

require __DIR__.'/auth.php';
