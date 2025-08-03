<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property mixed $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GeneratedPage> $generatedPages
 * @property-read int|null $generated_pages_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\UserSubscription|null $activeSubscription
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserSubscription> $subscriptions
 * @property-read int|null $subscriptions_count
 * 
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * 
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's subscriptions.
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(UserSubscription::class);
    }

    /**
     * Get the user's active subscription.
     */
    public function activeSubscription(): HasOne
    {
        return $this->hasOne(UserSubscription::class)->active();
    }

    /**
     * Get the user's generated pages.
     */
    public function generatedPages(): HasMany
    {
        return $this->hasMany(GeneratedPage::class);
    }

    /**
     * Check if the user has an active subscription.
     *
     * @return bool
     */
    public function hasActiveSubscription(): bool
    {
        return $this->activeSubscription()->exists();
    }

    /**
     * Get the user's current subscription plan.
     *
     * @return \App\Models\SubscriptionPlan|null
     */
    public function getCurrentPlan(): ?SubscriptionPlan
    {
        return $this->activeSubscription?->subscriptionPlan;
    }

    /**
     * Check if the user can generate more pages.
     *
     * @return bool
     */
    public function canGeneratePages(): bool
    {
        $subscription = $this->activeSubscription;
        
        if (!$subscription) {
            return false;
        }

        return $subscription->canGeneratePages();
    }

    /**
     * Get remaining page generations for the current period.
     *
     * @return int|null
     */
    public function getRemainingGenerations(): ?int
    {
        $subscription = $this->activeSubscription;
        
        if (!$subscription) {
            return 0;
        }

        return $subscription->getRemainingGenerations();
    }
}
