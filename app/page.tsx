import Hero from '@/components/home-page/hero'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const supabase = createClient()
  const { data: quizzes } = await supabase.from('quizzes').select()

  return (
    <>
      <h1 className='text-2xl font-bold'>Quizzes</h1>
      <p className='text-lg font-semibold'>Tag følgende quizzes:</p>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {quizzes?.map(quiz => (
          <Link href={`/quiz/${quiz.id}`} key={quiz.id}>
            <li className='rounded-md border border-gray-200 p-4'>
              <h2 className='text-lg font-semibold'>{quiz.title}</h2>
              <p className='text-sm text-gray-500'>{quiz.description}</p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  )
}
