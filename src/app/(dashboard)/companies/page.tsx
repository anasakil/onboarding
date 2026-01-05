"use client"

import { Header } from "@/components/dashboard"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Plus } from "lucide-react"

export default function CompaniesPage() {
  return (
    <div>
      <Header title="Companies" description="Manage your client companies" />

      <div className="p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-12 h-12 mx-auto text-text-secondary" />
            <h3 className="mt-4 text-lg font-medium text-text-primary">
              No companies yet
            </h3>
            <p className="mt-2 text-text-secondary">
              Companies are automatically created when you add new leads.
            </p>
            <Button className="mt-4">
              <Plus className="mr-2 w-4 h-4" /> Create Company
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
