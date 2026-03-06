'use client'

import type { Workflow, Role, Task, Tool, Guide } from '@/types'

interface WorkflowFormProps {
  action: (formData: FormData) => Promise<void>
  workflow?: Workflow
  roles: Role[]
  tasks: Task[]
  tools: Tool[]
  guides: Guide[]
}

export function WorkflowForm({ action, workflow, roles, tasks, tools, guides }: WorkflowFormProps) {
  return (
    <form action={action} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={workflow?.title ?? ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={workflow?.description ?? ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Long Description */}
      <div>
        <label htmlFor="long_description" className="mb-1 block text-sm font-medium text-slate-700">
          Long Description
        </label>
        <textarea
          id="long_description"
          name="long_description"
          rows={5}
          defaultValue={workflow?.long_description ?? ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Prompt */}
      <div>
        <label htmlFor="prompt" className="mb-1 block text-sm font-medium text-slate-700">
          Prompt
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={8}
          defaultValue={workflow?.prompt ?? ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Example Output */}
      <div>
        <label htmlFor="example_output" className="mb-1 block text-sm font-medium text-slate-700">
          Example Output
        </label>
        <textarea
          id="example_output"
          name="example_output"
          rows={8}
          defaultValue={workflow?.example_output ?? ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Use Case */}
      <div>
        <label htmlFor="use_case" className="mb-1 block text-sm font-medium text-slate-700">
          Use Case
        </label>
        <textarea
          id="use_case"
          name="use_case"
          rows={4}
          defaultValue={workflow?.use_case ?? ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Difficulty */}
        <div>
          <label htmlFor="difficulty" className="mb-1 block text-sm font-medium text-slate-700">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={workflow?.difficulty ?? 'beginner'}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={workflow?.status ?? 'draft'}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role_id" className="mb-1 block text-sm font-medium text-slate-700">
            Role
          </label>
          <select
            id="role_id"
            name="role_id"
            defaultValue={workflow?.role_id ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- None --</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Task */}
        <div>
          <label htmlFor="task_id" className="mb-1 block text-sm font-medium text-slate-700">
            Task
          </label>
          <select
            id="task_id"
            name="task_id"
            defaultValue={workflow?.task_id ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- None --</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tool */}
        <div>
          <label htmlFor="tool_id" className="mb-1 block text-sm font-medium text-slate-700">
            Tool
          </label>
          <select
            id="tool_id"
            name="tool_id"
            defaultValue={workflow?.tool_id ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- None --</option>
            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>

        {/* Guide */}
        <div>
          <label htmlFor="guide_id" className="mb-1 block text-sm font-medium text-slate-700">
            Guide
          </label>
          <select
            id="guide_id"
            name="guide_id"
            defaultValue={workflow?.guide_id ?? ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- None --</option>
            {guides.map((guide) => (
              <option key={guide.id} value={guide.id}>
                {guide.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={workflow?.featured ?? false}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="featured" className="text-sm font-medium text-slate-700">
          Featured
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {workflow ? 'Update Workflow' : 'Create Workflow'}
        </button>
      </div>
    </form>
  )
}
