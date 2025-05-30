<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Lead;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class LeadController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of leads.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         $this->authorize('viewAny', Lead::class);

        $leads = Lead::with('training')->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $leads
        ]);
    }

    /**
     * Store a newly created lead in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'training_id' => 'required|exists:trainings,id',
            'phone' => 'nullable|string|max:20',
            'message' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        try {
            $lead = Lead::create([
                'name' => $request->name,
                'email' => $request->email,
                'training_id' => $request->training_id,
                'phone' => $request->phone ?? null,
                'message' => $request->message ?? null,
                'status' => 'new',
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Your request has been submitted successfully. We will contact you shortly.',
                    'lead' => $lead
                ], 201);
            }

            return redirect()->back()->with('success', 'Lead created successfully.');
        } catch (\Exception $e) {
            Log::error('Lead creation failed: ' . $e->getMessage());

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'An error occurred while submitting your request. Please try again.'
                ], 500);
            }

            return redirect()->back()->with('error', 'An error occurred while submitting your request. Please try again.')->withInput();
        }
    }

    /**
     * Update the specified lead in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->authorize('update', Lead::class);

        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:new,contacted,qualified,converted,closed',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        $lead = Lead::findOrFail($id);
        $lead->status = $request->status;
        $lead->notes = $request->notes;
        $lead->updated_by = Auth::id();
        $lead->save();

        return redirect()->back()->with('success', 'Lead updated successfully.');
    }

    /**
     * Remove the specified lead from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('delete', Lead::class);

        $lead = Lead::findOrFail($id);
        $lead->delete();

        return redirect()->route('admin.leads.index')->with('success', 'Lead deleted successfully.');
    }
}
