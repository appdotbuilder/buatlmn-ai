<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GeneratedPage
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string|null $description
 * @property string $prompt
 * @property string $generated_html
 * @property string|null $generated_css
 * @property string|null $template_style
 * @property string $status
 * @property array|null $metadata
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage query()
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage completed()
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereGeneratedCss($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereGeneratedHtml($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage wherePrompt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereTemplateStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedPage whereUserId($value)
 * @method static \Database\Factories\GeneratedPageFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GeneratedPage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'prompt',
        'generated_html',
        'generated_css',
        'template_style',
        'status',
        'metadata',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'metadata' => 'array',
    ];

    /**
     * Get the user that owns the generated page.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include completed pages.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Check if the page generation is completed.
     *
     * @return bool
     */
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    /**
     * Check if the page generation failed.
     *
     * @return bool
     */
    public function hasFailed(): bool
    {
        return $this->status === 'failed';
    }

    /**
     * Check if the page is still generating.
     *
     * @return bool
     */
    public function isGenerating(): bool
    {
        return $this->status === 'generating';
    }

    /**
     * Get a short version of the prompt for display.
     *
     * @param int $length
     * @return string
     */
    public function getShortPrompt(int $length = 100): string
    {
        return strlen($this->prompt) > $length 
            ? substr($this->prompt, 0, $length) . '...' 
            : $this->prompt;
    }
}