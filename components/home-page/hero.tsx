import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, HelpCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Quiz() {
  const supabase = createClient()
  const { data: quizzes } = await supabase.from('quizzes').select(
    `
    *,
    questions (*)
  `
  )

  return (
    <div className='container mx-auto px-4 py-8'>
      <header className='mb-12 text-center'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
          Quizzer om Danmark {'\uD83C\uDDE9\uD83C\uDDF0'}
        </h1>
        <p className='mx-auto mt-4 max-w-[700px] text-muted-foreground'>
          Udfordringer for alle, der vil lære om Danmark. Test din viden og lær
          nye ting.
        </p>
      </header>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {quizzes?.map(quiz => (
          <Card key={quiz.id} className='flex flex-col'>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                <div className='flex items-center'>
                  <HelpCircle className='mr-1 h-4 w-4' />
                  <span>{quiz.questions.length} spørgsmål</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/quiz/${quiz.id}`}>
                <Button className='w-full'>Start Quiz</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
