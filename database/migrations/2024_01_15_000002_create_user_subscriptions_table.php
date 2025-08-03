<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('subscription_plan_id')->constrained()->onDelete('cascade');
            $table->timestamp('starts_at');
            $table->timestamp('ends_at')->nullable();
            $table->enum('status', ['active', 'cancelled', 'expired'])->default('active');
            $table->integer('pages_generated_this_period')->default(0);
            $table->timestamp('current_period_start');
            $table->timestamp('current_period_end');
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index('status');
            $table->index(['starts_at', 'ends_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_subscriptions');
    }
};