'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'

export default function QuizPage({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [loading, setLoading] = useState(true)

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

  const handleAnswer = (selectedAnswer: string) => {
    const questions = quiz.questions[currentQuestion]

    if (selectedAnswer === questions.correct_answer) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsFinished(true)
    }
  }

  if (isFinished) {
    return (
      <div>
        <h1>Du har færdiggjort spillet</h1>
        <p>
          Du fik {score} point ud af {quiz.questions.length}
        </p>
        <button onClick={() => (window.location.href = '/')}>
          Gå tilbage til forsiden
        </button>
      </div>
    )
  }

  const currentQ = quiz.questions[currentQuestion]

  return (
    <div>
      <h1>{quiz.title}</h1>
      <div>
        Spørgsmål {currentQuestion + 1} af {quiz.questions.length}
      </div>
      <p>{currentQ.question}</p>
      <div className='grid grid-cols-2 gap-4'>
        {currentQ.options.map((option: any) => (
          <button key={option} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
