import {
  GetBooksParams,
  GetBooksResponse,
  GetBookResponse,
  GetChapterResponse,
  UpdateBookProgressPayload,
  UpdateBookModePayload,
  GetBooksResponseSchema,
  GetBookResponseSchema,
  GetChapterResponseSchema,
} from '@/api/contracts/books';
import {
  ALL_SAMPLE_BOOKS,
  SAMPLE_NOVEL_CHAPTERS,
  SAMPLE_STUDY_CHAPTERS,
  SAMPLE_SCRIPTS_CHAPTERS,
} from '@/mocks/sample-data';
import { simulateDelay } from './simulate';

let books = [...ALL_SAMPLE_BOOKS];

export const mockBooksAdapter = {
  async getBooks(params?: GetBooksParams): Promise<GetBooksResponse> {
    await simulateDelay();
    let filtered = [...books];

    if (params?.shelf) {
      filtered = filtered.filter((b) => b.shelf === params.shelf);
    }
    if (params?.mode) {
      filtered = filtered.filter((b) => b.mode === params.mode);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q),
      );
    }

    return GetBooksResponseSchema.parse({
      books: filtered,
      total: filtered.length,
    });
  },

  async getBook(id: string): Promise<GetBookResponse> {
    await simulateDelay();
    const book = books.find((b) => b.id === id) ?? books[0]!;

    let chapters = SAMPLE_NOVEL_CHAPTERS;
    if (book.id === 'book-cognitive-science') {
      chapters = SAMPLE_STUDY_CHAPTERS;
    } else if (book.id === 'book-scripts-test') {
      chapters = SAMPLE_SCRIPTS_CHAPTERS;
    }

    return GetBookResponseSchema.parse({
      book,
      chapters,
      relatedBooks: [
        {
          id: 'rel-sense-sensibility',
          title: 'Sense and Sensibility',
          author: 'Jane Austen',
          relationReason: 'Same author; explores romance vs social convention',
          isPublicDomain: true,
        },
        {
          id: 'rel-thinking-fast-slow',
          title: 'Thinking, Fast and Slow',
          author: 'Daniel Kahneman',
          relationReason: 'Expands on dual-process cognitive architecture',
          isPublicDomain: false,
        },
      ],
    });
  },

  async getChapter(bookId: string, chapterId: string): Promise<GetChapterResponse> {
    await simulateDelay(40);
    const bookRes = await this.getBook(bookId);
    const chapterIndex = bookRes.chapters.findIndex((c) => c.id === chapterId);
    const chapter = bookRes.chapters[chapterIndex] ?? bookRes.chapters[0]!;

    return GetChapterResponseSchema.parse({
      chapter,
      prevChapterId: chapterIndex > 0 ? (bookRes.chapters[chapterIndex - 1]?.id ?? null) : null,
      nextChapterId:
        chapterIndex < bookRes.chapters.length - 1
          ? (bookRes.chapters[chapterIndex + 1]?.id ?? null)
          : null,
    });
  },

  async updateProgress(id: string, payload: UpdateBookProgressPayload): Promise<void> {
    await simulateDelay(30);
    books = books.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        progressPercent: payload.progressPercent,
        currentPosition: {
          chapterId: payload.chapterId,
          offset: payload.offset,
        },
        lastReadAt: new Date().toISOString(),
      };
    });
  },

  async updateMode(id: string, payload: UpdateBookModePayload): Promise<void> {
    await simulateDelay(30);
    books = books.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        mode: payload.mode,
      };
    });
  },
};
