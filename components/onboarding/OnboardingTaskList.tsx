'use client'

import React from 'react'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CheckCircle2Icon, CircleIcon } from 'lucide-react'

type Task = {
  id: number
  title: string
  completed: boolean
}

interface OnboardingTaskListProps {
  tasks: Task[]
}

export default function OnboardingTaskList({ tasks }: OnboardingTaskListProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>My onboarding tasks</CardTitle>
        <CardDescription>
          {completedTasks}/{totalTasks} tasks done
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Progress
          value={(completedTasks / totalTasks) * 100}
          className="w-full"
        />
      </CardFooter>
      <Table>
        <TableHeader className='hidden'>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                {task.completed ? (
                  <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                ) : (
                  <CircleIcon className="h-4 w-4 text-gray-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
