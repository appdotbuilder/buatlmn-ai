<?php

namespace Database\Factories;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubscriptionPlan>
 */
class SubscriptionPlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\SubscriptionPlan>
     */
    protected $model = SubscriptionPlan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 0, 99.99),
            'billing_period' => $this->faker->randomElement(['monthly', 'yearly']),
            'page_generations_limit' => $this->faker->optional()->numberBetween(1, 100),
            'features' => [
                $this->faker->sentence(),
                $this->faker->sentence(),
                $this->faker->sentence(),
            ],
            'is_active' => true,
            'sort_order' => $this->faker->numberBetween(1, 10),
        ];
    }

    /**
     * Indicate that the plan is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the plan has unlimited generations.
     */
    public function unlimited(): static
    {
        return $this->state(fn (array $attributes) => [
            'page_generations_limit' => null,
        ]);
    }
}