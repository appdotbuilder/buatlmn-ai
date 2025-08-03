<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\UserSubscription
 *
 * @property int $id
 * @property int $user_id
 * @property int $subscription_plan_id
 * @property \Illuminate\Support\Carbon $starts_at
 * @property \Illuminate\Support\Carbon|null $ends_at
 * @property string $status
 * @property int $pages_generated_this_period
 * @property \Illuminate\Support\Carbon $current_period_start
 * @property \Illuminate\Support\Carbon $current_period_end
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\SubscriptionPlan $subscriptionPlan
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription active()
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereCurrentPeriodEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereCurrentPeriodStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereEndsAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription wherePagesGeneratedThisPeriod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereStartsAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereSubscriptionPlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserSubscription whereUserId($value)
 * @method static \Database\Factories\UserSubscriptionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class UserSubscription extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'subscription_plan_id',
        'starts_at',
        'ends_at',
        'status',
        'pages_generated_this_period',
        'current_period_start',
        'current_period_end',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'current_period_start' => 'datetime',
        'current_period_end' => 'datetime',
        'pages_generated_this_period' => 'integer',
    ];

    /**
     * Get the user that owns the subscription.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the subscription plan.
     */
    public function subscriptionPlan(): BelongsTo
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }

    /**
     * Scope a query to only include active subscriptions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                    ->where('current_period_end', '>', now());
    }

    /**
     * Check if the subscription is currently active.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->status === 'active' && $this->current_period_end > now();
    }

    /**
     * Check if the user can generate more pages.
     *
     * @return bool
     */
    public function canGeneratePages(): bool
    {
        if (!$this->isActive()) {
            return false;
        }

        if ($this->subscriptionPlan->hasUnlimitedGenerations()) {
            return true;
        }

        return $this->pages_generated_this_period < $this->subscriptionPlan->page_generations_limit;
    }

    /**
     * Get remaining page generations for this period.
     *
     * @return int|null
     */
    public function getRemainingGenerations(): ?int
    {
        if ($this->subscriptionPlan->hasUnlimitedGenerations()) {
            return null;
        }

        return max(0, $this->subscriptionPlan->page_generations_limit - $this->pages_generated_this_period);
    }
}