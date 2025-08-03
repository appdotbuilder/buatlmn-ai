<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGeneratedPageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'prompt' => 'required|string|min:10|max:2000',
            'template_style' => 'nullable|string|in:modern,classic,minimal,creative,business',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please provide a title for your page.',
            'title.max' => 'The title must not exceed 255 characters.',
            'prompt.required' => 'Please describe what kind of page you want to create.',
            'prompt.min' => 'Please provide at least 10 characters describing your page.',
            'prompt.max' => 'The prompt must not exceed 2000 characters.',
            'template_style.in' => 'Please select a valid template style.',
        ];
    }
}