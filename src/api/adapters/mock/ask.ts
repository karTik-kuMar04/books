import {
  AskQuestionPayload,
  AskQuestionResponse,
  GetQaHistoryResponse,
  AskQuestionResponseSchema,
  GetQaHistoryResponseSchema,
} from '@/api/contracts/ask';
import { SAMPLE_QA_HISTORY } from '@/mocks/sample-data';
import { simulateDelay } from './simulate';

const history = [...SAMPLE_QA_HISTORY];

export const mockAskAdapter = {
  async getHistory(bookId: string): Promise<GetQaHistoryResponse> {
    await simulateDelay();
    const messages = history.filter((m) => m.bookId === bookId);

    return GetQaHistoryResponseSchema.parse({
      messages: messages.length > 0 ? messages : SAMPLE_QA_HISTORY,
      suggestedQuestions: [
        'How does working memory capacity influence learning speed?',
        'What are the three components of Cognitive Load Theory?',
        'How do schemas allow experts to bypass working memory limits?',
      ],
    });
  },

  async askQuestion(payload: AskQuestionPayload): Promise<AskQuestionResponse> {
    await simulateDelay(600); // slightly longer to simulate AI streaming/synthesis

    const userMsg = {
      id: `qa-user-${Date.now()}`,
      bookId: payload.bookId,
      role: 'user' as const,
      content: {
        text: payload.question,
        status: 'ready' as const,
      },
      citations: [],
      scope: payload.scope,
      chapterId: payload.chapterId,
      createdAt: new Date().toISOString(),
    };

    const isPassageOnly = payload.passagesOnly;
    const aiAnswer = isPassageOnly
      ? 'Relevant passage found: "Working memory operates as an active mental workspace with finite capacity, heavily modulated by the central executive."'
      : `Based on Chapter 1 and 2, ${payload.question.toLowerCase().includes('memory') ? 'human working memory is constrained to 4±1 active chunks, requiring organized schemas to process complex tasks efficiently.' : 'the text emphasizes cognitive architecture and systematic reduction of extraneous mental load.'}`;

    const assistantMsg = {
      id: `qa-ai-${Date.now()}`,
      bookId: payload.bookId,
      role: 'assistant' as const,
      content: {
        text: aiAnswer,
        status: 'ready' as const,
        provenance: 'Synthesized from Chapters 1 & 2',
      },
      citations: [
        {
          id: `ev-qa-${Date.now()}`,
          bookId: payload.bookId,
          chapterId: payload.chapterId ?? 'cog-ch-1',
          chapterTitle: 'Chapter 1: The Architecture of Memory',
          startOffset: 170,
          endOffset: 290,
          passage:
            'Working memory operates as an active mental workspace with finite capacity, heavily modulated by the central executive.',
        },
      ],
      scope: payload.scope,
      chapterId: payload.chapterId,
      createdAt: new Date().toISOString(),
    };

    history.push(userMsg, assistantMsg);

    return AskQuestionResponseSchema.parse({
      message: assistantMsg,
    });
  },
};
