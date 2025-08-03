<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\SubscriptionPlan
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $price
 * @property string $billing_period
 * @property int|null $page_generations_limit
 * @property array|null $features
 * @property bool $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserSubscription> $userSubscriptions
 * @property-read int|null $user_subscriptions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan active()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereBillingPeriod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereFeatures($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan wherePageGenerationsLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereUpdatedAt($value)
 * @method static \Database\Factories\SubscriptionPlanFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class SubscriptionPlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'billing_period',
        'page_generations_limit',
        'features',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'page_generations_limit' => 'integer',
        'features' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get the user subscriptions for this plan.
     */
    public function userSubscriptions(): HasMany
    {
        return $this->hasMany(UserSubscription::class);
    }

    /**
     * Scope a query to only include active plans.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Check if this plan has unlimited page generations.
     *
     * @return bool
     */
    public function hasUnlimitedGenerations(): bool
    {
        return $this->page_generations_limit === null;
    }

    /**
     * Get formatted price with currency.
     *
     * @return string
     */
    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format((float) $this->price, 2);
    }
}