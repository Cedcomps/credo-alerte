// components/UpgradePro.tsx
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Gem } from "lucide-react"

export default function UpgradePro() {
  return (
    <Card className="invisible group-hover:visible">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>
          Unlock all features and get unlimited access to our support team.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" className="w-full">
          <Gem className="mr-2 h-4 w-4" /> Upgrade
        </Button>
      </CardContent>
    </Card>
  )
}
