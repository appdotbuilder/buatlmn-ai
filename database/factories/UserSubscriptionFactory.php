<?php

namespace Database\Factories;

use App\Models\SubscriptionPlan;
use App\Models\User;
use App\Models\UserSubscription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserSubscription>
 */
class UserSubscriptionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\UserSubscription>
     */
    protected $model = UserSubscription::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 month', 'now');
        $endDate = (clone $startDate)->modify('+1 month');

        return [
            'user_id' => User::factory(),
            'subscription_plan_id' => SubscriptionPlan::factory(),
            'starts_at' => $startDate,
            'ends_at' => null,
            'status' => 'active',
            'pages_generated_this_period' => $this->faker->numberBetween(0, 10),
            'current_period_start' => $startDate,
            'current_period_end' => $endDate,
        ];
    }

    /**
     * Indicate that the subscription is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
        ]);
    }

    /**
     * Indicate that the subscription is expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'expired',
            'current_period_end' => $this->faker->dateTimeBetween('-1 month', '-1 day'),
        ]);
    }
}