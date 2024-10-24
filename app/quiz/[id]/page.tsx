'use client'

// import the supabase client
import { createClient } from '@/utils/supabase/client'

// import react
import React, { useEffect, useState } from 'react'

// import the ui components
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

// export the quiz page
export default function QuizPage({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<any>(null) // initilaze the quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0) // current question index
  const [score, setScore] = useState(0) // score
  const [isFinished, setIsFinished] = useState(false) // is the quiz finished
  const [loading, setLoading] = useState(true) // is the quiz loading
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined // selected answer
  )

  useEffect(() => {
    async function loadQuiz() {
      const supabase = createClient()

      // fetch the quiz data from the database
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

      setQuiz(quizData) // set the quiz data

      setLoading(false) // set the loading to false when the quiz is loaded
    }

    loadQuiz()
  }, [params.id]) // load the quiz when the id changes from the url

  // if the quiz is loading, show the loading message
  if (loading) return <div>Indlæser...</div>

  // if the quiz is not found, show the not found message
  if (!quiz) return <div>Quiz ikke fundet</div>

  // method to handle the next question
  const handleNextQuestion = () => {
    // if the selected answer is not undefined
    // then get the current question
    if (selectedAnswer !== undefined) {
      const currentQ = quiz.questions[currentQuestion]

      // if the selected answer is the correct answer
      // then increment the score
      if (
        currentQ.options[parseInt(selectedAnswer)] === currentQ.correct_answer
      ) {
        setScore(score + 1)
      }

      // if the current question is not the last question
      // then increment the current question index
      if (currentQuestion + 1 < quiz.questions.length) {
        setCurrentQuestion(currentQuestion + 1)

        // explicitly reset the selected answer
        setSelectedAnswer(undefined)
      } else {
        setIsFinished(true)
      }
    }
  }

  // if the quiz is finished, show the score
  if (isFinished) {
    return (
      <div className='flex flex-col items-center space-y-4 p-8'>
        <h1 className='text-2xl font-bold'>Du har færdiggjort spillet</h1>
        <p className='text-lg'>
          Du fik {score} point ud af {quiz.questions.length} spørgsmål
        </p>

        {/* go back to the home page */}
        <Button onClick={() => (window.location.href = '/')} className='mt-4'>
          Gå tilbage til forsiden
        </Button>
      </div>
    )
  }

  // get the current question
  const currentQ = quiz.questions[currentQuestion]

  return (
    <div className='container mx-auto max-w-2xl px-4 py-8'>
      <Card className='flex h-[500px] w-full flex-col'>
        <CardHeader>
          <div className='flex flex-row space-y-2'>
            <CardTitle className='text-2xl font-bold'>{quiz.title}</CardTitle>
          </div>
          <CardDescription>
            Spørgsmål {currentQuestion + 1} af {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-grow overflow-y-auto'>
          {/* show the current question */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>{currentQ.question}</h2>

            {/* show the options */}
            <RadioGroup
              key={currentQuestion}
              onValueChange={setSelectedAnswer}
              value={selectedAnswer}
            >
              {/* show the options */}
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

        {/* show the next question button */}
        {/* disabled if the selected answer is undefined */}
        <CardFooter className='mt-auto'>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === undefined}
            className='w-full'
          >
            {/* show the correct button text */}
            {currentQuestion === quiz.questions.length - 1
              ? 'Afslut Quiz'
              : 'Næste Spørgsmål'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
