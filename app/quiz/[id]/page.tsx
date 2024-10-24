'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function QuizPage({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    async function loadQuiz() {
      const supabase = createClient()
      const { data: quizData } = await supabase
        .from('quizzes')
        .select(
          `
          *,
          questions (*)
        `
        )
        .eq('id', params.id)
        .single()

      setQuiz(quizData)
      setLoading(false)
    }

    loadQuiz()
  }, [params.id])

  if (loading) return <div>Indlæser...</div>
  if (!quiz) return <div>Quiz ikke fundet</div>

  const handleNextQuestion = () => {
    if (selectedAnswer !== undefined) {
      const currentQ = quiz.questions[currentQuestion]
      if (
        currentQ.options[parseInt(selectedAnswer)] === currentQ.correct_answer
      ) {
        setScore(score + 1)
      }

      if (currentQuestion + 1 < quiz.questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        // explicitly reset the selected answer
        setSelectedAnswer(undefined)
      } else {
        setIsFinished(true)
      }
    }
  }

  if (isFinished) {
    return (
      <div className='flex flex-col items-center space-y-4 p-8'>
        <h1 className='text-2xl font-bold'>Du har færdiggjort spillet</h1>
        <p className='text-lg'>
          Du fik {score} point ud af {quiz.questions.length}
        </p>
        <Button onClick={() => (window.location.href = '/')} className='mt-4'>
          Gå tilbage til forsiden
        </Button>
      </div>
    )
  }

  const currentQ = quiz.questions[currentQuestion]

  return (
    <div className='container mx-auto max-w-2xl px-4 py-8'>
      <Card className='flex h-[500px] w-full flex-col'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{quiz.title}</CardTitle>
          <CardDescription>
            Spørgsmål {currentQuestion + 1} af {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-grow overflow-y-auto'>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>{currentQ.question}</h2>
            <RadioGroup
              key={currentQuestion}
              onValueChange={setSelectedAnswer}
              value={selectedAnswer}
            >
              {currentQ.options.map((option: string, index: number) => (
                <div key={index} className='flex items-center space-x-2 py-2'>
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className='mt-auto'>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === undefined}
            className='w-full'
          >
            {currentQuestion === quiz.questions.length - 1
              ? 'Afslut Quiz'
              : 'Næste Spørgsmål'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
