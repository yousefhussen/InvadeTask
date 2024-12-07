<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::with('category');


        if ($search = $request->input('search') ) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }





        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($dueDate = $request->input('due_date')) {
            $query->whereDate('due_date', $dueDate);
        }

        if ($categoryId = $request->input('category_id')) {
            $query->where('category_id', $categoryId);
        }


        if ($sortBy = $request->input('sort_by')) {
            $sortOrder = $request->input('sort_order', 'asc');
            if (in_array($sortBy, ['due_date', 'title', 'description', 'created_at', 'updated_at'])) {
                $query->orderBy($sortBy, $sortOrder);
            } elseif ($sortBy === 'category_name') {
                $query->join('categories', 'tasks.category_id', '=', 'categories.id')
                    ->orderBy('categories.name', $sortOrder)
                    ->select('tasks.*');
            }
        }


        $perPage = $request->input('per_page', 15);
        return $query->paginate($perPage);
    }


    public function store(Request $request)
    {
        $user = auth()->user();
        $request->merge(['user_id' => $user->id]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,completed',
            'due_date' => 'nullable|date',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        return Task::create($validated);
    }

    public function update(Request $request, Task $task)
    {
        $user = auth()->user();
        $request->merge(['user_id' => $user->id]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,completed',
            'due_date' => 'nullable|date',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $task->update($validated);

        return $task;
    }
    public function show(Task $task)
    {
        return $task;
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['message'=>'Task deleted successfully']);
    }

    public function deleted()
    {
        return Task::onlyTrashed()->get();
    }

    public function forceDelete($id)
    {
        $task = Task::withTrashed()->findOrFail($id);
        $task->forceDelete();
        return response()->json(['message' => 'Task deleted permanently.']);
    }

    public function restore($id)
    {
        $task = Task::withTrashed()->findOrFail($id);
        $task->restore();
        return response()->json(['message' => 'Task restored successfully.']);
    }
}
