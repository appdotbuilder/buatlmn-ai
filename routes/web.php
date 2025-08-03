<?php

use App\Http\Controllers\PageGeneratorController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Page Generator routes
    Route::get('/generate', [PageGeneratorController::class, 'index'])->name('page-generator');
    Route::post('/generate', [PageGeneratorController::class, 'store'])->name('pages.store');
    Route::get('/pages/{page}', [PageGeneratorController::class, 'show'])->name('pages.show');
    Route::get('/pages/{page}/edit', [PageGeneratorController::class, 'edit'])->name('pages.edit');
    Route::patch('/pages/{page}', [PageGeneratorController::class, 'update'])->name('pages.update');
    Route::delete('/pages/{page}', [PageGeneratorController::class, 'destroy'])->name('pages.destroy');

    // Subscription routes
    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::post('/subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
    Route::delete('/subscriptions', [SubscriptionController::class, 'destroy'])->name('subscriptions.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
