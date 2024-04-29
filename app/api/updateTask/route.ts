import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  const { taskId, completed } = await req.json();
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from('user_onboarding_tasks')
      .update({ completed })
      .eq('user_id', user.id)
      .eq('onboarding_task_id', taskId);
  }

  return NextResponse.json({ message: 'Task updated successfully' });
}
