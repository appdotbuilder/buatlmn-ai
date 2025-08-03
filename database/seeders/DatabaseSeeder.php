<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SubscriptionPlanSeeder::class,
        ]);

        // Create test user with free subscription
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Give the test user a free subscription
        $freePlan = \App\Models\SubscriptionPlan::where('name', 'Free')->first();
        if ($freePlan) {
            \App\Models\UserSubscription::create([
                'user_id' => $user->id,
                'subscription_plan_id' => $freePlan->id,
                'starts_at' => now(),
                'status' => 'active',
                'current_period_start' => now(),
                'current_period_end' => now()->addMonth(),
                'pages_generated_this_period' => 0,
            ]);
        }
    }
}
