<?php

namespace App\Http\Controllers;

use App\Models\SiteVisit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SiteVisitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = SiteVisit::query()->select(
            'ip_address',
            'page_visited',
            'visit_time',
            'country',
            'city',
            'device_type',
            'referrer',
            'id'
        );

        // Filter by page if provided
        if ($request->has('page_visited') && !empty($request->page_visited)) {
            $query->where('page_visited', 'like', '%' . $request->page_visited . '%');
        }

        // Filter by country if provided
        if ($request->has('country') && !empty($request->country)) {
            $query->where('country', $request->country);
        }

        // Filter by date range if provided
        if ($request->has('date_from') && !empty($request->date_from)) {
            $query->whereDate('visit_time', '>=', $request->date_from);
        }

        if ($request->has('date_to') && !empty($request->date_to)) {
            $query->whereDate('visit_time', '<=', $request->date_to);
        }

        // Filter by device type if provided
        if ($request->has('device_type') && !empty($request->device_type)) {
            $query->where('device_type', $request->device_type);
        }

        $siteVisits = $query->latest('visit_time')->paginate(15);

        return Inertia::render('Admin/Analytics/SiteVisits', [
            'siteVisits' => $siteVisits,
            'filters' => $request->only(['page_visited', 'country', 'date_from', 'date_to', 'device_type']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ip_address' => 'required|string|max:45',
            'user_agent' => 'nullable|string',
            'page_visited' => 'required|string|max:255',
            'referrer' => 'nullable|string',
            'visit_time' => 'required|date',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'device_type' => 'nullable|string|in:desktop,mobile,tablet,unknown',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $siteVisit = SiteVisit::create($validator->validated());

        return response()->json([
            'message' => 'Site visit recorded successfully!',
            'site_visit' => $siteVisit
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(SiteVisit $siteVisit)
    {
        return response()->json(['site_visit' => $siteVisit]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SiteVisit $siteVisit)
    {
        $validator = Validator::make($request->all(), [
            'ip_address' => 'required|string|max:45',
            'user_agent' => 'nullable|string',
            'page_visited' => 'required|string|max:255',
            'referrer' => 'nullable|string',
            'visit_time' => 'required|date',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'device_type' => 'nullable|string|in:desktop,mobile,tablet,unknown',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $siteVisit->update($validator->validated());

        return response()->json([
            'message' => 'Site visit updated successfully!',
            'site_visit' => $siteVisit
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, SiteVisit $siteVisit)
    {
        $siteVisit->delete();

        if ($request->ajax() || $request->expectsJson()) {
            return response()->json([
                'message' => 'Site visit deleted successfully!'
            ]);
        }

        return redirect()->route('admin.analytics.site-visits')->with('success', 'Site visit deleted successfully!');
    }

    /**
     * Get analytics data for dashboard widgets.
     */
    public function getAnalytics()
    {
        // Get total visit count
        $totalVisits = SiteVisit::count();

        // Get unique visitors count (by IP)
        $uniqueVisitors = SiteVisit::distinct('ip_address')->count('ip_address');

        // Get visits by page
        $visitsByPage = SiteVisit::select('page_visited')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('page_visited')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        // Get visits by device type
        $visitsByDevice = SiteVisit::select('device_type')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('device_type')
            ->orderByDesc('count')
            ->get();

        // Get visits by country
        $visitsByCountry = SiteVisit::select('country')
            ->selectRaw('COUNT(*) as count')
            ->whereNotNull('country')
            ->groupBy('country')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        // Get visits by date (last 30 days)
        $visitsByDate = SiteVisit::selectRaw('DATE(visit_time) as date')
            ->selectRaw('COUNT(*) as count')
            ->whereDate('visit_time', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'totalVisits' => $totalVisits,
            'uniqueVisitors' => $uniqueVisitors,
            'visitsByPage' => $visitsByPage,
            'visitsByDevice' => $visitsByDevice,
            'visitsByCountry' => $visitsByCountry,
            'visitsByDate' => $visitsByDate
        ]);
    }
}
