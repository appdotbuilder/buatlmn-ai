<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGeneratedPageRequest;
use App\Models\GeneratedPage;
use App\Models\SubscriptionPlan;
use App\Services\PageGeneratorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageGeneratorController extends Controller
{
    /**
     * Display the page generator interface.
     */
    public function index()
    {
        $user = auth()->user();
        $subscription = $user?->activeSubscription;
        $remainingGenerations = $user?->getRemainingGenerations();
        
        return Inertia::render('page-generator', [
            'subscription' => $subscription ? [
                'plan' => $subscription->subscriptionPlan,
                'remaining_generations' => $remainingGenerations,
                'can_generate' => $user->canGeneratePages(),
            ] : null,
            'recent_pages' => $user?->generatedPages()
                ->latest()
                ->take(5)
                ->get()
                ->map(function($page) {
                    /** @var GeneratedPage $page */
                    return [
                        'id' => $page->id,
                        'title' => $page->title,
                        'status' => $page->status,
                        'created_at' => $page->created_at->format('M j, Y g:i A'),
                    ];
                }) ?? [],
        ]);
    }

    /**
     * Store a new page generation request.
     */
    public function store(StoreGeneratedPageRequest $request, PageGeneratorService $pageGenerator)
    {
        $user = auth()->user();

        if (!$user->canGeneratePages()) {
            return back()->withErrors(['limit' => 'You have reached your page generation limit for this period.']);
        }

        $page = GeneratedPage::create([
            'user_id' => $user->id,
            'title' => $request->validated('title'),
            'description' => $request->validated('description'),
            'prompt' => $request->validated('prompt'),
            'template_style' => $request->validated('template_style'),
            'status' => 'generating',
            'generated_html' => '',
        ]);

        // Simulate AI generation (in real app, this would be queued)
        $generatedContent = $pageGenerator->generatePage($request->validated());
        
        $page->update([
            'generated_html' => $generatedContent['html'],
            'generated_css' => $generatedContent['css'],
            'status' => 'completed',
        ]);

        // Update user's generation count
        $subscription = $user->activeSubscription;
        if ($subscription) {
            $subscription->increment('pages_generated_this_period');
        }

        return redirect()->route('pages.show', $page)
            ->with('success', 'Your page has been generated successfully!');
    }

    /**
     * Display the specified generated page.
     */
    public function show(GeneratedPage $page)
    {
        if (auth()->user()->id !== $page->user_id) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('pages/show', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'description' => $page->description,
                'prompt' => $page->prompt,
                'generated_html' => $page->generated_html,
                'generated_css' => $page->generated_css,
                'template_style' => $page->template_style,
                'status' => $page->status,
                'created_at' => $page->created_at->format('M j, Y g:i A'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified page.
     */
    public function edit(GeneratedPage $page)
    {
        if (auth()->user()->id !== $page->user_id) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('pages/edit', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'description' => $page->description,
                'prompt' => $page->prompt,
                'template_style' => $page->template_style,
            ],
        ]);
    }

    /**
     * Update the specified page.
     */
    public function update(StoreGeneratedPageRequest $request, GeneratedPage $page, PageGeneratorService $pageGenerator)
    {
        if (auth()->user()->id !== $page->user_id) {
            abort(403, 'Unauthorized');
        }

        $user = auth()->user();

        // Check if user can regenerate (if prompt changed)
        if ($request->validated('prompt') !== $page->prompt && !$user->canGeneratePages()) {
            return back()->withErrors(['limit' => 'You have reached your page generation limit for this period.']);
        }

        $needsRegeneration = $request->validated('prompt') !== $page->prompt || 
                           $request->validated('template_style') !== $page->template_style;

        $page->update([
            'title' => $request->validated('title'),
            'description' => $request->validated('description'),
            'prompt' => $request->validated('prompt'),
            'template_style' => $request->validated('template_style'),
        ]);

        if ($needsRegeneration) {
            $page->update(['status' => 'generating']);
            
            // Simulate AI generation
            $generatedContent = $pageGenerator->generatePage($request->validated());
            
            $page->update([
                'generated_html' => $generatedContent['html'],
                'generated_css' => $generatedContent['css'],
                'status' => 'completed',
            ]);

            // Update generation count if prompt changed
            if ($request->validated('prompt') !== $page->getOriginal('prompt')) {
                $subscription = $user->activeSubscription;
                if ($subscription) {
                    $subscription->increment('pages_generated_this_period');
                }
            }
        }

        return redirect()->route('pages.show', $page)
            ->with('success', 'Page updated successfully!');
    }

    /**
     * Remove the specified page.
     */
    public function destroy(GeneratedPage $page)
    {
        if (auth()->user()->id !== $page->user_id) {
            abort(403, 'Unauthorized');
        }

        $page->delete();

        return redirect()->route('page-generator')
            ->with('success', 'Page deleted successfully!');
    }
}