'use client'

import type { Workflow, Role, Task, Tool, Guide } from '@/types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

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
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={workflow?.title ?? ''}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={workflow?.description ?? ''}
        />
      </div>

      {/* Long Description */}
      <div className="space-y-2">
        <Label htmlFor="long_description">Long Description</Label>
        <Textarea
          id="long_description"
          name="long_description"
          rows={5}
          defaultValue={workflow?.long_description ?? ''}
        />
      </div>

      {/* Prompt */}
      <div className="space-y-2">
        <Label htmlFor="prompt">Prompt</Label>
        <Textarea
          id="prompt"
          name="prompt"
          rows={8}
          defaultValue={workflow?.prompt ?? ''}
          className="font-mono"
        />
      </div>

      {/* Example Output */}
      <div className="space-y-2">
        <Label htmlFor="example_output">Example Output</Label>
        <Textarea
          id="example_output"
          name="example_output"
          rows={8}
          defaultValue={workflow?.example_output ?? ''}
          className="font-mono"
        />
      </div>

      {/* Use Case */}
      <div className="space-y-2">
        <Label htmlFor="use_case">Use Case</Label>
        <Textarea
          id="use_case"
          name="use_case"
          rows={4}
          defaultValue={workflow?.use_case ?? ''}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Difficulty */}
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={workflow?.difficulty ?? 'beginner'}
            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={workflow?.status ?? 'draft'}
            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role_id">Role</Label>
          <select
            id="role_id"
            name="role_id"
            defaultValue={workflow?.role_id ?? ''}
            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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
        <div className="space-y-2">
          <Label htmlFor="task_id">Task</Label>
          <select
            id="task_id"
            name="task_id"
            defaultValue={workflow?.task_id ?? ''}
            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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
        <div className="space-y-2">
          <Label htmlFor="tool_id">Tool</Label>
          <select
            id="tool_id"
            name="tool_id"
            defaultValue={workflow?.tool_id ?? ''}
            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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
        <div className="space-y-2">
          <Label htmlFor="guide_id">Guide</Label>
          <select
            id="guide_id"
            name="guide_id"
            defaultValue={workflow?.guide_id ?? ''}
            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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
          className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
        />
        <Label htmlFor="featured">Featured</Label>
      </div>

      <div>
        <Button type="submit">
          {workflow ? 'Update Workflow' : 'Create Workflow'}
        </Button>
      </div>
    </form>
  )
}
