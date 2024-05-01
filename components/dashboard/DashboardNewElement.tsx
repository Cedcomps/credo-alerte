import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, SquarePlus } from "lucide-react";
import { useRouter } from 'next/navigation';

interface DashboardNewElementProps {
  menuName: string;
}

export default function DashboardNewElement({ menuName }: DashboardNewElementProps) {
  const router = useRouter();
  let title = "";
  let description = "";

  switch (menuName) {
    case "alert":
      title = "Your Alerts";
      description = "Stay on Top of Critical Events with Our Intuitive Alert Management System for Effective Communication.";
      break;
    case "product":
      title = "Your Products";
      description = "Efficiently Manage Your Product Catalog and Streamline Inventory Control.";
      break;
    case "directory":
      title = "Your Contact Base";
      description = "Efficiently Manage and Engage with Your Contact Base for Seamless Communication.";
      break;
    default:
      title = "Dashboard";
      description = "Welcome to Your Comprehensive Dashboard for Data-Driven Decision Making.";
  }

  const handleCreateNewClick = () => {
    if (menuName === 'alert') {
      router.push('/dashboard/alerts/create');
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        {menuName === 'directory' ? (
          <>
            <Button  onClick={() => router.push('/dashboard/contacts/create')}>
              <SquarePlus className="h-4 w-4" />
              &nbsp; Add Contact</Button>
            <Button variant="secondary" onClick={() => router.push('/dashboard/groups/create')}>
              <SquarePlus className="h-4 w-4" />
              &nbsp; Add Group</Button>
          </>
        ) : (
          <Button onClick={handleCreateNewClick}>
            <SquarePlus className="h-4 w-4" />
          &nbsp; Add {title.split(" ")[1]}</Button>
        )}
      </CardFooter>
    </Card>
  );
}
