<?php

namespace App\Services;

class PageGeneratorService
{
    /**
     * Generate a webpage based on the provided parameters.
     *
     * @param array $data
     * @return array
     */
    public function generatePage(array $data): array
    {
        $title = $data['title'];
        $description = $data['description'] ?? '';
        $prompt = $data['prompt'];
        $templateStyle = $data['template_style'] ?? 'modern';

        // Simulate AI generation with template-based HTML/CSS
        $html = $this->generateHTML($title, $description, $prompt, $templateStyle);
        $css = $this->generateCSS($templateStyle);

        return [
            'html' => $html,
            'css' => $css,
        ];
    }

    /**
     * Generate HTML content based on the prompt and style.
     *
     * @param string $title
     * @param string $description
     * @param string $prompt
     * @param string $templateStyle
     * @return string
     */
    protected function generateHTML(string $title, string $description, string $prompt, string $templateStyle): string
    {
        // This is a simplified AI simulation
        // In a real app, this would call OpenAI API or similar
        
        $sections = $this->extractSectionsFromPrompt($prompt);
        
        $html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n";
        $html .= "    <meta charset=\"UTF-8\">\n";
        $html .= "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n";
        $html .= "    <title>" . htmlspecialchars($title) . "</title>\n";
        
        if ($description) {
            $html .= "    <meta name=\"description\" content=\"" . htmlspecialchars($description) . "\">\n";
        }
        
        $html .= "    <style>\n        /* Generated CSS will be injected here */\n    </style>\n";
        $html .= "</head>\n<body class=\"{$templateStyle}-template\">\n";
        
        // Header
        $html .= "    <header class=\"site-header\">\n";
        $html .= "        <div class=\"container\">\n";
        $html .= "            <h1 class=\"site-title\">" . htmlspecialchars($title) . "</h1>\n";
        if ($description) {
            $html .= "            <p class=\"site-description\">" . htmlspecialchars($description) . "</p>\n";
        }
        $html .= "        </div>\n";
        $html .= "    </header>\n\n";
        
        // Main content
        $html .= "    <main class=\"main-content\">\n";
        $html .= "        <div class=\"container\">\n";
        
        foreach ($sections as $section) {
            $html .= "            <section class=\"content-section\">\n";
            $html .= "                <h2>" . htmlspecialchars($section['title']) . "</h2>\n";
            $html .= "                <p>" . htmlspecialchars($section['content']) . "</p>\n";
            $html .= "            </section>\n\n";
        }
        
        $html .= "        </div>\n";
        $html .= "    </main>\n\n";
        
        // Footer
        $html .= "    <footer class=\"site-footer\">\n";
        $html .= "        <div class=\"container\">\n";
        $html .= "            <p>&copy; " . date('Y') . " " . htmlspecialchars($title) . ". All rights reserved.</p>\n";
        $html .= "        </div>\n";
        $html .= "    </footer>\n";
        $html .= "</body>\n</html>";
        
        return $html;
    }

    /**
     * Generate CSS based on the template style.
     *
     * @param string $templateStyle
     * @return string
     */
    protected function generateCSS(string $templateStyle): string
    {
        $baseCSS = "
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.site-header {
    padding: 4rem 0;
    text-align: center;
}

.site-title {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.site-description {
    font-size: 1.2rem;
    opacity: 0.8;
}

.main-content {
    padding: 2rem 0;
}

.content-section {
    margin-bottom: 3rem;
}

.content-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.content-section p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
}

.site-footer {
    padding: 2rem 0;
    text-align: center;
    opacity: 0.7;
}
";

        switch ($templateStyle) {
            case 'modern':
                return $baseCSS . "
.modern-template {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.site-header {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}

.content-section {
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(5px);
}
";

            case 'classic':
                return $baseCSS . "
.classic-template {
    background: #f8f9fa;
    color: #2c3e50;
}

.site-header {
    background: #34495e;
    color: white;
}

.content-section {
    background: white;
    padding: 2rem;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
";

            case 'minimal':
                return $baseCSS . "
.minimal-template {
    background: white;
    color: #333;
}

.site-title {
    font-weight: 300;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
}

.content-section {
    border-left: 3px solid #007bff;
    padding-left: 2rem;
}
";

            case 'creative':
                return $baseCSS . "
.creative-template {
    background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
    color: #444;
}

.site-title {
    font-family: 'Comic Sans MS', cursive;
    transform: rotate(-2deg);
}

.content-section {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 20px;
    transform: rotate(1deg);
}

.content-section:nth-child(even) {
    transform: rotate(-1deg);
}
";

            case 'business':
            default:
                return $baseCSS . "
.business-template {
    background: #f4f4f4;
    color: #333;
}

.site-header {
    background: #2c3e50;
    color: white;
}

.content-section {
    background: white;
    padding: 2rem;
    border-left: 4px solid #3498db;
    margin-bottom: 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
";
        }
    }

    /**
     * Extract sections from the prompt.
     *
     * @param string $prompt
     * @return array
     */
    protected function extractSectionsFromPrompt(string $prompt): array
    {
        // This is a simplified AI simulation
        // In a real app, this would use NLP to extract meaningful sections
        
        $sections = [];
        $words = explode(' ', $prompt);
        $wordCount = count($words);
        
        if ($wordCount > 50) {
            // Create multiple sections for longer prompts
            $sectionsCount = min(4, intval($wordCount / 20));
            $wordsPerSection = intval($wordCount / $sectionsCount);
            
            for ($i = 0; $i < $sectionsCount; $i++) {
                $startIndex = $i * $wordsPerSection;
                $endIndex = min(($i + 1) * $wordsPerSection, $wordCount);
                $sectionWords = array_slice($words, $startIndex, $endIndex - $startIndex);
                
                $sections[] = [
                    'title' => 'Section ' . ($i + 1),
                    'content' => $this->generateSectionContent(implode(' ', $sectionWords)),
                ];
            }
        } else {
            $sections[] = [
                'title' => 'About',
                'content' => $this->generateSectionContent($prompt),
            ];
        }
        
        return $sections;
    }

    /**
     * Generate section content based on keywords.
     *
     * @param string $text
     * @return string
     */
    protected function generateSectionContent(string $text): string
    {
        // This simulates AI content generation
        $templates = [
            "This section focuses on {keywords}. Our approach ensures that every aspect is carefully considered to deliver the best possible results for our users.",
            "When it comes to {keywords}, we believe in excellence and innovation. This drives us to create solutions that truly make a difference.",
            "Our expertise in {keywords} allows us to provide comprehensive services that meet and exceed expectations. We're committed to quality and customer satisfaction.",
            "The importance of {keywords} cannot be overstated in today's digital landscape. We leverage cutting-edge technology to stay ahead of the curve.",
        ];
        
        // Extract key phrases (simplified)
        $keywords = $this->extractKeywords($text);
        $template = $templates[random_int(0, count($templates) - 1)];
        
        return str_replace('{keywords}', $keywords, $template);
    }

    /**
     * Extract keywords from text.
     *
     * @param string $text
     * @return string
     */
    protected function extractKeywords(string $text): string
    {
        $words = explode(' ', strtolower($text));
        $stopWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
        
        $keywords = array_filter($words, function($word) use ($stopWords) {
            return !in_array($word, $stopWords) && strlen($word) > 3;
        });
        
        $topKeywords = array_slice(array_unique($keywords), 0, 3);
        
        return implode(', ', $topKeywords) ?: 'innovation and excellence';
    }
}