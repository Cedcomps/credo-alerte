import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardQuotaCardProps {
    menuName: string;
}
  export default function DashboardQuotaCard({ menuName }: DashboardQuotaCardProps) {
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
        <Card>
            <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">1,329</CardTitle>
            </CardHeader>
            <CardContent>
        <div className="text-xs text-muted-foreground"> You reached {description}</div>
            </CardContent>
            <CardFooter>
                <Progress value={25} aria-label="25% increase" />
            </CardFooter>
        </Card>
    )
  }