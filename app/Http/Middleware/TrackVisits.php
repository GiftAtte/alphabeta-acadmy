<?php

namespace App\Http\Middleware;

use App\Models\SiteVisit;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Don't track API requests or admin routes
        if (!$request->is('api/*') && !$request->is('admin/*')) {
            // Create a new site visit record
            SiteVisit::create([
                'id' => Str::uuid()->toString(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'page_visited' => $request->path() === '/' ? '/' : '/' . $request->path(),
                'referrer' => $request->header('referer'),
                'visit_time' => now(),
                'country' => null, // Would need a geo-IP service for real implementation
                'city' => null,    // Would need a geo-IP service for real implementation
                'device_type' => $this->getDeviceType($request->userAgent()),
            ]);
        }

        return $response;
    }

    /**
     * Determine the device type from user agent string.
     *
     * @param string|null $userAgent
     * @return string
     */
    protected function getDeviceType(?string $userAgent): string
    {
        if (!$userAgent) {
            return 'unknown';
        }

        if (preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i', $userAgent)) {
            return 'mobile';
        }

        if (preg_match('/android|ipad|playbook|silk/i', $userAgent)) {
            return 'tablet';
        }

        return 'desktop';
    }
}
