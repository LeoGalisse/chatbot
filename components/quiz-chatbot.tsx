"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Result } from "@/models/result";
import { Option } from "@/models/option";
import { Message } from "@/models/message";

export default function QuizChatbot() {
  const [state, setState] = useState({
    messages: [] as Message[],
    currentQuestionIndex: 0,
    quizComplete: false,
    loading: false,
    showScrollButton: false,
    autoScroll: true,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToRecentMessages = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      setState((prevState) => ({
        ...prevState,
        autoScroll: true,
      }));
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    if (!isAtBottom) {
      setState((prevState) => ({
        ...prevState,
        autoScroll: false,
        showScrollButton: !isAtBottom,
      }));
    } else if (scrollTop !== 0) {
      setState((prevState) => ({
        ...prevState,
        autoScroll: true,
        showScrollButton: !isAtBottom,
      }));
    }
  };

  const addBotMessage = (content: string) => {
    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        { id: crypto.randomUUID(), type: "bot", content },
      ],
    }));
  };

  const addUserMessage = (content: string) => {
    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        { id: crypto.randomUUID(), type: "user", content },
      ],
    }));
  };

  const addOptionsMessage = (questionId: number, options: Option[]) => {
    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          id: crypto.randomUUID(),
          type: "options",
          content: options,
          questionId,
        },
      ],
    }));
  };

  const addResultsMessage = (results: Result[], score: number) => {
    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          id: crypto.randomUUID(),
          type: "results",
          content: { results, score },
        },
      ],
    }));
  };

  const fetchNextQuestion = useCallback(async () => {
    setState(prevState => ({
      ...prevState,
      loading: true,
    }));
  
    try {
      const response = await fetch(`/api/${state.currentQuestionIndex}`);
      const question = await response.json();
  
      if (state.currentQuestionIndex === 0) {
        addBotMessage(
          "Olá! Vou fazer 3 perguntas de múltipla escolha para você."
        );
      }
  
      addBotMessage(question.text);
      addOptionsMessage(question.id, question.options);
    } catch (error) {
      addBotMessage("Desculpe, ocorreu um erro ao carregar a pergunta.");
      console.error(error);
    } finally {
      setState(prevState => ({
        ...prevState,
        loading: false,
      }));
    }
  }, [state.currentQuestionIndex]);

  const handleSelectOption = async (
    questionId: number,
    optionId: string,
    optionText: string
  ) => {
    if (state.loading) return;

    setState(prevState => ({
      ...prevState,
      loading: true,
      autoScroll: true
    }));

    addUserMessage(optionText);

    try {
      const response = await fetch(`/api`, {
        method: "POST",
        body: JSON.stringify({
          questionId,
          answerId: optionId,
        }),
      });

      const data = await response.json();

      if ("results" in data) {
        setState(prevState => ({
          ...prevState,
          quizComplete: true
        }));

        addBotMessage(`Você acertou ${data.score} de 3 perguntas.`);

        addResultsMessage(data.results, data.score);

        addBotMessage("Obrigado por participar do quiz!");
      } else {
        setState(prevState => ({
          ...prevState,
          currentQuestionIndex: prevState.currentQuestionIndex + 1
        }));
      }
    } catch (error) {
      addBotMessage("Desculpe, ocorreu um erro ao processar sua resposta.");
      console.error(error);
    } finally {
      setState(prevState => ({
        ...prevState,
        loading: false
      }));
    }
  };

  useEffect(() => {
    if (!state.quizComplete) {
      fetchNextQuestion();
    }
  }, [state.currentQuestionIndex, state.quizComplete, fetchNextQuestion]);

  useEffect(() => {
    if (state.autoScroll) {
      scrollToRecentMessages();
    }
  }, [state.messages, state.autoScroll]);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col"
        onScroll={handleScroll}
        style={{ scrollBehavior: "smooth" }}
      >
        {state.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.type === "bot" && (
              <div className="bg-gray-200 rounded-lg p-3 max-w-[80%]">
                <p>{message.content}</p>
              </div>
            )}

            {message.type === "user" && (
              <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                <p>{message.content}</p>
              </div>
            )}

            {message.type === "options" && (
              <div className="bg-gray-100 rounded-lg p-3 w-full">
                <div className="space-y-2">
                  {message.content.map((option: Option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() =>
                        handleSelectOption(
                          message.questionId!,
                          option.id,
                          option.text
                        )
                      }
                      disabled={state.loading}
                    >
                      {option.id}) {option.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {message.type === "results" && (
              <div className="bg-gray-100 rounded-lg p-3 w-full">
                <div className="space-y-2">
                  {message.content.results.map((result: { correct: boolean, question: string, correctAnswer: string}, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-2 border rounded-md bg-white"
                    >
                      <div
                        className={`text-lg ${
                          result.correct ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {result.correct ? "✅" : "❌"}
                      </div>
                      <div>
                        <p className="font-medium">{result.question}</p>
                        <p className="text-sm text-gray-500">
                          Resposta correta: {result.correctAnswer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {state.showScrollButton && (
        <Button
          size="icon"
          variant="outline"
          className="absolute bottom-20 right-8 rounded-full"
          onClick={scrollToRecentMessages}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}

      <div className="p-4 border-t">
        <div className="text-center text-sm text-gray-500">
          {state.loading
            ? "Processando..."
            : state.quizComplete
            ? "Quiz completo"
            : "Selecione uma opção acima"}
        </div>
      </div>
    </div>
  );
}
