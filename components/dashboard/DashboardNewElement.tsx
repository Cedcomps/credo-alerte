import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DashboardNewElementProps {
  menuName: string;
}

export default function DashboardNewElement({ menuName }: DashboardNewElementProps) {
  let title = "";
  let description = "";

  switch (menuName) {
    case "alarm":
      title = "Your Alarms";
      description = "Stay on Top of Critical Events with Our Intuitive Alarm Management System for Effective Communication.";
      break;
    case "product":
      title = "Your Products";
      description = "Efficiently Manage Your Product Catalog and Streamline Inventory Control.";
      break;
    case "contact":
      title = "Your Contact Base";
      description = "Efficiently Manage and Engage with Your Contact Base for Seamless Communication.";
      break;
    default:
      title = "Dashboard";
      description = "Welcome to Your Comprehensive Dashboard for Data-Driven Decision Making.";
  }

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Create New {title.split(" ")[1]}</Button>
      </CardFooter>
    </Card>
  )
}
