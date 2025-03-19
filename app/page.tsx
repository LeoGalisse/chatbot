"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import QuizChatbot from "@/components/quiz-chatbot"

export default function Home() {
  const [started, setStarted] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            Quiz Chatbot
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          {!started ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <p className="text-center mb-4 text-gray-600">
                Bem-vindo ao Quiz Chatbot! Clique no botão abaixo para iniciar o quiz.
              </p>
              <Button onClick={() => setStarted(true)}>Iniciar Quiz</Button>
            </div>
          ) : (
            <QuizChatbot />
          )}
        </CardContent>
      </Card>
    </main>
  )
}

