"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Header } from "@/components/dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, GripVertical, Save, ArrowLeft, X } from "lucide-react"
import Link from "next/link"

interface FormField {
  _id?: string
  name: string
  label: string
  type: string
  placeholder?: string
  required: boolean
  options?: string[]
  step: number
  order: number
}

interface Step {
  _id?: string
  title: string
  description?: string
  order: number
}

interface Service {
  _id: string
  name: string
  slug: string
  category: string
  description?: string
  icon?: string
  color?: string
  isActive: boolean
  steps: Step[]
  fields: FormField[]
}

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'url', label: 'URL' },
  { value: 'select', label: 'Dropdown' },
  { value: 'multiselect', label: 'Multi-Select' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'file', label: 'File Upload' },
]

const CATEGORIES = [
  'Development',
  'Marketing',
  'Design',
  'Content',
  'Consulting',
  'Other',
]

export default function ServiceEditPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fieldDialogOpen, setFieldDialogOpen] = useState(false)
  const [stepDialogOpen, setStepDialogOpen] = useState(false)
  const [editingField, setEditingField] = useState<FormField | null>(null)
  const [editingStep, setEditingStep] = useState<Step | null>(null)
  const [newOption, setNewOption] = useState('')

  useEffect(() => {
    fetchService()
  }, [slug])

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/services/${slug}`)
      if (res.ok) {
        const data = await res.json()
        setService(data)
      }
    } catch (error) {
      console.error('Failed to fetch service:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!service) return
    setSaving(true)
    try {
      const res = await fetch(`/api/services/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      })
      if (res.ok) {
        router.push('/services')
      }
    } catch (error) {
      console.error('Failed to save service:', error)
    } finally {
      setSaving(false)
    }
  }

  const addStep = () => {
    setEditingStep({
      title: '',
      description: '',
      order: (service?.steps?.length || 0) + 1,
    })
    setStepDialogOpen(true)
  }

  const saveStep = () => {
    if (!service || !editingStep) return

    const newSteps = editingStep._id
      ? service.steps.map((s) =>
          s._id === editingStep._id ? editingStep : s
        )
      : [...(service.steps || []), editingStep]

    setService({ ...service, steps: newSteps })
    setStepDialogOpen(false)
    setEditingStep(null)
  }

  const deleteStep = (stepOrder: number) => {
    if (!service) return
    const newSteps = service.steps
      .filter((s) => s.order !== stepOrder)
      .map((s, i) => ({ ...s, order: i + 1 }))

    // Update fields to remove fields from deleted step
    const newFields = service.fields.filter((f) => f.step !== stepOrder)
      .map((f) => f.step > stepOrder ? { ...f, step: f.step - 1 } : f)

    setService({ ...service, steps: newSteps, fields: newFields })
  }

  const addField = (stepNumber: number) => {
    const fieldsInStep = service?.fields?.filter((f) => f.step === stepNumber) || []
    setEditingField({
      name: '',
      label: '',
      type: 'text',
      placeholder: '',
      required: false,
      options: [],
      step: stepNumber,
      order: fieldsInStep.length,
    })
    setFieldDialogOpen(true)
  }

  const saveField = () => {
    if (!service || !editingField) return

    // Generate name from label if not set
    const fieldToSave = {
      ...editingField,
      name: editingField.name || editingField.label.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
    }

    const newFields = editingField._id
      ? service.fields.map((f) =>
          f._id === editingField._id ? fieldToSave : f
        )
      : [...(service.fields || []), fieldToSave]

    setService({ ...service, fields: newFields })
    setFieldDialogOpen(false)
    setEditingField(null)
  }

  const deleteField = (field: FormField) => {
    if (!service) return
    const newFields = service.fields
      .filter((f) => f._id !== field._id && f.name !== field.name)
      .map((f, i) => f.step === field.step ? { ...f, order: i } : f)
    setService({ ...service, fields: newFields })
  }

  const addOption = () => {
    if (!editingField || !newOption.trim()) return
    setEditingField({
      ...editingField,
      options: [...(editingField.options || []), newOption.trim()],
    })
    setNewOption('')
  }

  const removeOption = (optionIndex: number) => {
    if (!editingField) return
    setEditingField({
      ...editingField,
      options: editingField.options?.filter((_, i) => i !== optionIndex),
    })
  }

  if (loading) {
    return (
      <div>
        <Header title="Edit Service" description="Loading..." />
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded-lg" />
            <div className="h-64 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div>
        <Header title="Service Not Found" description="" />
        <div className="p-6">
          <p>The requested service was not found.</p>
          <Link href="/services">
            <Button className="mt-4">Back to Services</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header
        title={`Edit: ${service.name}`}
        description="Configure service details and form fields"
        action={
          <div className="flex gap-2">
            <Link href="/services">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </Link>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Service Details */}
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={service.name}
                  onChange={(e) =>
                    setService({ ...service, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={service.category}
                  onValueChange={(value) =>
                    setService({ ...service, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={service.description || ''}
                onChange={(e) =>
                  setService({ ...service, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="icon">Icon (emoji or letter)</Label>
                <Input
                  id="icon"
                  value={service.icon || ''}
                  onChange={(e) =>
                    setService({ ...service, icon: e.target.value })
                  }
                  maxLength={2}
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={service.color || '#6BBE4A'}
                    onChange={(e) =>
                      setService({ ...service, color: e.target.value })
                    }
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={service.color || '#6BBE4A'}
                    onChange={(e) =>
                      setService({ ...service, color: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={service.isActive}
                  onCheckedChange={(checked) =>
                    setService({ ...service, isActive: checked })
                  }
                />
                <Label>Active</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps & Fields */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Form Steps & Fields</CardTitle>
            <Button onClick={addStep} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {(!service.steps || service.steps.length === 0) ? (
              <div className="text-center py-8 text-text-secondary">
                <p>No steps configured yet.</p>
                <Button onClick={addStep} className="mt-4" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Step
                </Button>
              </div>
            ) : (
              service.steps
                .sort((a, b) => a.order - b.order)
                .map((step) => {
                  const stepFields = service.fields
                    ?.filter((f) => f.step === step.order)
                    ?.sort((a, b) => a.order - b.order) || []

                  return (
                    <div
                      key={step._id || step.order}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                            {step.order}
                          </div>
                          <div>
                            <h4 className="font-medium">{step.title}</h4>
                            {step.description && (
                              <p className="text-sm text-text-secondary">
                                {step.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingStep(step)
                              setStepDialogOpen(true)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteStep(step.order)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Fields in this step */}
                      <div className="space-y-2 ml-11">
                        {stepFields.length === 0 ? (
                          <p className="text-sm text-text-secondary">
                            No fields in this step
                          </p>
                        ) : (
                          stepFields.map((field) => (
                            <div
                              key={field._id || field.name}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <GripVertical className="w-4 h-4 text-gray-400" />
                                <div>
                                  <span className="font-medium">
                                    {field.label}
                                  </span>
                                  <div className="flex gap-2 mt-1">
                                    <Badge variant="secondary" className="text-xs">
                                      {field.type}
                                    </Badge>
                                    {field.required && (
                                      <Badge variant="destructive" className="text-xs">
                                        Required
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingField(field)
                                    setFieldDialogOpen(true)
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteField(field)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addField(step.order)}
                          className="w-full mt-2"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Field
                        </Button>
                      </div>
                    </div>
                  )
                })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Step Dialog */}
      <Dialog open={stepDialogOpen} onOpenChange={setStepDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStep?._id ? 'Edit Step' : 'Add Step'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="stepTitle">Title</Label>
              <Input
                id="stepTitle"
                value={editingStep?.title || ''}
                onChange={(e) =>
                  setEditingStep(editingStep ? { ...editingStep, title: e.target.value } : null)
                }
                placeholder="e.g., Basic Information"
              />
            </div>
            <div>
              <Label htmlFor="stepDescription">Description (optional)</Label>
              <Textarea
                id="stepDescription"
                value={editingStep?.description || ''}
                onChange={(e) =>
                  setEditingStep(editingStep ? { ...editingStep, description: e.target.value } : null)
                }
                placeholder="Brief description of this step"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStepDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveStep}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Field Dialog */}
      <Dialog open={fieldDialogOpen} onOpenChange={setFieldDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingField?._id ? 'Edit Field' : 'Add Field'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <Label htmlFor="fieldLabel">Label</Label>
              <Input
                id="fieldLabel"
                value={editingField?.label || ''}
                onChange={(e) =>
                  setEditingField(editingField ? { ...editingField, label: e.target.value } : null)
                }
                placeholder="e.g., Full Name"
              />
            </div>
            <div>
              <Label htmlFor="fieldType">Type</Label>
              <Select
                value={editingField?.type || 'text'}
                onValueChange={(value) =>
                  setEditingField(editingField ? { ...editingField, type: value } : null)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FIELD_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fieldPlaceholder">Placeholder (optional)</Label>
              <Input
                id="fieldPlaceholder"
                value={editingField?.placeholder || ''}
                onChange={(e) =>
                  setEditingField(editingField ? { ...editingField, placeholder: e.target.value } : null)
                }
                placeholder="e.g., Enter your name"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editingField?.required || false}
                onCheckedChange={(checked) =>
                  setEditingField(editingField ? { ...editingField, required: checked } : null)
                }
              />
              <Label>Required</Label>
            </div>

            {/* Options for select, multiselect, radio, checkbox */}
            {['select', 'multiselect', 'radio', 'checkbox'].includes(
              editingField?.type || ''
            ) && (
              <div>
                <Label>Options</Label>
                <div className="space-y-2 mt-2">
                  {editingField?.options?.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input value={option} readOnly className="flex-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(index)}
                        className="text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      placeholder="Add option..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addOption()
                        }
                      }}
                    />
                    <Button variant="outline" onClick={addOption}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFieldDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveField}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
