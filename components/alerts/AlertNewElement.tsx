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


export default function AlertNewElement() {
  const router = useRouter();
  const handleCreateNewClick = () => {
      router.push('/alert/alerts/create');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        {/* <CardTitle>Alert</CardTitle> */}
        <CardDescription className="max-w-lg text-balance leading-relaxed">
        Stay on Top of Critical Events with Our Intuitive Alert Management System for Effective Communication  
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
          <Button onClick={handleCreateNewClick}>
            <SquarePlus className="h-4 w-4" />
          &nbsp; Create New Alert</Button>
      </CardFooter>
    </Card>
  );
}
