import type {
  Book,
  Chapter,
  Character,
  Relationship,
  Concept,
  ConceptLink,
  KeyPoint,
  Mark,
  VocabEntry,
  Card,
  Deck,
  QaMessage,
  Job,
} from '@/api/contracts/shared';

// Generate ~8,200 words for Chapter 1 of the novel to properly exercise virtualization
function generateLongChapterText(): {
  wordCount: number;
  paragraphs: { offset: number; text: string }[];
} {
  const baseParagraphs = [
    'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.',
    '"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?" Mr. Bennet replied that he had not. "But it is," returned she; "for Mrs. Long has just been here, and she told me all about it." Mr. Bennet made no answer. "Do you not want to know who has taken it?" cried his wife impatiently.',
    '"You want to tell me, and I have no objection to hearing it." This was invitation enough. "Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately."',
    '"What is his name?" "Bingley." "Is he married or single?" "Oh! single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!" "How so? How can it affect them?" "My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."',
    "The business of Mrs. Bennet's life was to get her daughters married; its solace was visiting and news. When she could not hear what Mr. Bingley was doing, she made Elizabeth sit and speculate with her by the window. Elizabeth preferred quiet walks in the shrubbery, yet she could not entirely escape the domestic commotion that settled over Longbourn.",
    'At the assembly ball, Mr. Bingley soon danced with Jane twice, a distinction noticed by everyone in the room. His friend, Mr. Darcy, danced only with Bingley\'s sisters and declined to be introduced to any other lady. When Bingley urged him to dance with Elizabeth Bennet, Darcy looked at her for a moment and remarked coolly, "She is tolerable; but not handsome enough to tempt me."',
    'Elizabeth remained seated, her eyes sparkling with amusement rather than distress. She had a lively, playful disposition that delighted in anything ridiculous. She related the story immediately to Charlotte Lucas with great spirit, for she had no intention of nursing an injured vanity over the opinion of a disagreeable stranger.',
  ];

  const paragraphs: { offset: number; text: string }[] = [];
  let currentOffset = 0;
  let wordCount = 0;

  // Repeat and expand to reach >8,000 words across ~80 paragraphs
  for (let i = 0; i < 85; i++) {
    const baseIndex = i % baseParagraphs.length;
    const baseText = baseParagraphs[baseIndex] ?? '';
    const paragraphText = `[¶${i + 1}] ${baseText} The afternoon conversations reflected the general sentiment of Hertfordshire society, balancing expectations against the realities of fortune, family status, and the unpredictable turns of courtship.`;
    const words = paragraphText.split(/\s+/).length;
    wordCount += words;

    paragraphs.push({
      offset: currentOffset,
      text: paragraphText,
    });
    currentOffset += paragraphText.length + 2; // account for double newline
  }

  return { wordCount, paragraphs };
}

const longChapterData = generateLongChapterText();

export const SAMPLE_NOVEL_BOOK: Book = {
  id: 'book-pride-and-prejudice',
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  mode: 'story',
  format: 'epub',
  language: 'en',
  dir: 'ltr',
  progressPercent: 24,
  currentPosition: {
    chapterId: 'ch-1',
    offset: 1420,
  },
  lastReadAt: new Date(Date.now() - 3600000).toISOString(),
  totalChapters: 6,
  shelf: 'reading',
  tags: ['Classics', 'Romance', 'British Literature'],
  featureStatuses: {
    textExtraction: 'ready',
    characters: 'ready',
    timeline: 'ready',
    marks: 'ready',
    readAloud: 'ready',
  },
};

export const SAMPLE_NOVEL_CHAPTERS: Chapter[] = [
  {
    id: 'ch-1',
    index: 1,
    title: 'Chapter 1: The Arrival at Netherfield',
    wordCount: longChapterData.wordCount,
    characterCount: longChapterData.paragraphs.reduce((sum, p) => sum + p.text.length, 0),
    paragraphs: longChapterData.paragraphs,
    summary: {
      text: 'Mr. Bingley rents Netherfield Park, setting off matrimonial ambitions for Mrs. Bennet and her daughters.',
      status: 'ready',
      provenance: 'AI analysis from text chapters 1-3',
      confidence: 0.98,
    },
    authorIdea: {
      text: 'Austen satirizes the mercenary nature of marriage in Regency England through the comic urgency of Mrs. Bennet.',
      status: 'ready',
      provenance: 'Literary thematic synthesis',
      confidence: 0.95,
    },
  },
  {
    id: 'ch-2',
    index: 2,
    title: 'Chapter 2: The Meryton Assembly',
    wordCount: 1850,
    characterCount: 10400,
    paragraphs: [
      {
        offset: 0,
        text: 'The evening at the assembly ball introduced the neighbourhood to Mr. Darcy’s pride and Mr. Bingley’s easy charm. Darcy refused to dance with Elizabeth, sparking her enduring prejudice against his arrogance.',
      },
      {
        offset: 210,
        text: '"He is the proudest, most disagreeable man in the world, and everybody hoped that he would never come there again," reported Mrs. Bennet at breakfast the following morning.',
      },
    ],
    summary: {
      text: 'At the Meryton ball, Bingley enchants Jane while Darcy snubs Elizabeth, cementing the central conflict.',
      status: 'ready',
    },
    authorIdea: {
      text: 'First impressions are established as powerful yet deceptive shields that obscure moral character.',
      status: 'ready',
    },
  },
  {
    id: 'ch-3',
    index: 3,
    title: 'Chapter 3: Jane at Netherfield',
    wordCount: 2100,
    characterCount: 11800,
    paragraphs: [
      {
        offset: 0,
        text: 'Jane is invited to Netherfield for dinner and falls ill after riding through the rain on horseback. Elizabeth walks three miles through mud to attend to her sister.',
      },
    ],
    summary: {
      text: 'Elizabeth tends to an ailing Jane at Netherfield, earning Darcy’s secret admiration for her fine eyes.',
      status: 'ready',
    },
  },
  {
    id: 'ch-4',
    index: 4,
    title: 'Chapter 4: The Arrival of Mr. Collins',
    wordCount: 2400,
    characterCount: 13200,
    paragraphs: [
      {
        offset: 0,
        text: 'Mr. Collins, the pompous clergyman cousin who will inherit Longbourn under the entail, arrives seeking a wife among his cousins to atone for the legal disinheritance.',
      },
    ],
    summary: {
      text: 'Mr. Collins introduces his obsequious devotion to Lady Catherine and proposes to Elizabeth, who rejects him.',
      status: 'ready',
    },
  },
  {
    id: 'ch-5',
    index: 5,
    title: 'Chapter 5: Wickham’s Revelations',
    wordCount: 1950,
    characterCount: 11000,
    paragraphs: [
      {
        offset: 0,
        text: 'George Wickham charm Elizabeth with stories of Darcy’s alleged cruelty and betrayal over an ecclesiastical living.',
      },
    ],
    summary: {
      text: 'Wickham poisons Elizabeth against Darcy with a fabricated tale of lost inheritance.',
      status: 'ready',
    },
  },
  {
    id: 'ch-6',
    index: 6,
    title: 'Chapter 6: The Netherfield Ball',
    wordCount: 2800,
    characterCount: 15400,
    paragraphs: [
      {
        offset: 0,
        text: 'Darcy asks Elizabeth to dance, leading to a tense, witty duel of words. The next morning, the Bingleys abruptly quit Netherfield for London.',
      },
    ],
    summary: {
      text: 'A confrontation between Darcy and Elizabeth on the dance floor precedes Bingley’s departure for London.',
      status: 'ready',
    },
  },
];

export const SAMPLE_CHARACTERS: Character[] = [
  {
    id: 'char-elizabeth',
    bookId: 'book-pride-and-prejudice',
    name: 'Elizabeth Bennet',
    role: 'main',
    importanceScore: 0.98,
    traits: ['witty', 'independent', 'perceptive', 'proud'],
    firstAppearanceChapter: 1,
    mentionCount: 420,
    isHidden: false,
  },
  {
    id: 'char-darcy',
    bookId: 'book-pride-and-prejudice',
    name: 'Fitzwilliam Darcy',
    role: 'main',
    importanceScore: 0.95,
    traits: ['haughty', 'principled', 'wealthy', 'reserved'],
    firstAppearanceChapter: 1,
    mentionCount: 380,
    isHidden: false,
  },
  {
    id: 'char-jane',
    bookId: 'book-pride-and-prejudice',
    name: 'Jane Bennet',
    role: 'supporting',
    importanceScore: 0.82,
    traits: ['gentle', 'optimistic', 'modest'],
    firstAppearanceChapter: 1,
    mentionCount: 240,
    isHidden: false,
  },
  {
    id: 'char-bingley',
    bookId: 'book-pride-and-prejudice',
    name: 'Charles Bingley',
    role: 'supporting',
    importanceScore: 0.78,
    traits: ['amiable', 'pliant', 'generous'],
    firstAppearanceChapter: 1,
    mentionCount: 210,
    isHidden: false,
  },
  {
    id: 'char-wickham',
    bookId: 'book-pride-and-prejudice',
    name: 'George Wickham',
    role: 'supporting',
    importanceScore: 0.72,
    traits: ['charming', 'deceitful', 'opportunistic'],
    firstAppearanceChapter: 3,
    mentionCount: 160,
    isHidden: false,
  },
  {
    id: 'char-mr-bennet',
    bookId: 'book-pride-and-prejudice',
    name: 'Mr. Bennet',
    role: 'supporting',
    importanceScore: 0.68,
    traits: ['sarcastic', 'detached', 'intellectual'],
    firstAppearanceChapter: 1,
    mentionCount: 155,
    isHidden: false,
  },
  {
    id: 'char-mrs-bennet',
    bookId: 'book-pride-and-prejudice',
    name: 'Mrs. Bennet',
    role: 'supporting',
    importanceScore: 0.65,
    traits: ['excitable', 'fretful', 'calculating'],
    firstAppearanceChapter: 1,
    mentionCount: 170,
    isHidden: false,
  },
  {
    id: 'char-lydia',
    bookId: 'book-pride-and-prejudice',
    name: 'Lydia Bennet',
    role: 'supporting',
    importanceScore: 0.6,
    traits: ['reckless', 'boisterous', 'flirtatious'],
    firstAppearanceChapter: 1,
    mentionCount: 110,
    isHidden: false,
  },
  {
    id: 'char-catherine',
    bookId: 'book-pride-and-prejudice',
    name: 'Lady Catherine de Bourgh',
    role: 'supporting',
    importanceScore: 0.58,
    traits: ['imperious', 'condescending', 'authoritarian'],
    firstAppearanceChapter: 4,
    mentionCount: 95,
    isHidden: false,
  },
  {
    id: 'char-charlotte',
    bookId: 'book-pride-and-prejudice',
    name: 'Charlotte Lucas',
    role: 'minor',
    importanceScore: 0.52,
    traits: ['pragmatic', 'sensible', 'patient'],
    firstAppearanceChapter: 1,
    mentionCount: 88,
    isHidden: false,
  },
];

export const SAMPLE_RELATIONSHIPS: Relationship[] = [
  {
    id: 'rel-1',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-elizabeth',
    targetCharacterId: 'char-darcy',
    type: 'romance',
    strength: 9,
    description: {
      text: 'Antagonistic tension evolving through intellectual respect into deep mutual devotion.',
      status: 'ready',
      provenance: 'Extracted from dialogue interactions across chapters 1-6',
    },
    evidence: {
      id: 'ev-rel-1',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-1',
      chapterTitle: 'Chapter 1: The Arrival at Netherfield',
      startOffset: 1240,
      endOffset: 1390,
      passage:
        '"She is tolerable; but not handsome enough to tempt me," remarked Darcy coolly, cementing Elizabeth\'s sharp amusement and initial hostility.',
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-2',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-jane',
    targetCharacterId: 'char-bingley',
    type: 'romance',
    strength: 8,
    description: {
      text: "Gentle, immediate mutual affection hindered by Bingley's diffidence and Darcy's interference.",
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-2',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-1',
      chapterTitle: 'Chapter 1: The Arrival at Netherfield',
      startOffset: 890,
      endOffset: 1040,
      passage:
        'Mr. Bingley soon danced with Jane twice, a distinction noticed by everyone in the room.',
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-3',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-elizabeth',
    targetCharacterId: 'char-jane',
    type: 'family',
    strength: 9,
    description: {
      text: 'Devoted sisters and confidantes with contrasting temperaments of skepticism and benevolence.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-3',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-3',
      chapterTitle: 'Chapter 3: Jane at Netherfield',
      startOffset: 0,
      endOffset: 160,
      passage:
        'Elizabeth walked three miles through mud and rain to nurse her sister at Netherfield.',
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-4',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-darcy',
    targetCharacterId: 'char-bingley',
    type: 'allies',
    strength: 8,
    description: {
      text: "Close friends whose relationship balances Bingley's deference with Darcy's protective counsel.",
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-4',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-1',
      chapterTitle: 'Chapter 1: The Arrival at Netherfield',
      startOffset: 1100,
      endOffset: 1220,
      passage:
        "Bingley urged Darcy to dance and enjoy the evening, deferring often to his friend's judgment.",
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-5',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-darcy',
    targetCharacterId: 'char-wickham',
    type: 'rivals',
    strength: 9,
    description: {
      text: "Bitter estrangement originating in Wickham's financial misconduct and betrayal of Georgiana Darcy.",
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-5',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-5',
      chapterTitle: 'Chapter 5: Wickham’s Revelations',
      startOffset: 0,
      endOffset: 130,
      passage:
        'Wickham told Elizabeth of Darcy’s alleged cruelty and refusal to grant the promised ecclesiastical living.',
    },
    firstObservedChapter: 3,
  },
  {
    id: 'rel-6',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-mr-bennet',
    targetCharacterId: 'char-mrs-bennet',
    type: 'family',
    strength: 6,
    description: {
      text: 'A marriage of mismatched minds: cynical detachment on his side, frantic ambition on hers.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-6',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-1',
      chapterTitle: 'Chapter 1: The Arrival at Netherfield',
      startOffset: 250,
      endOffset: 410,
      passage:
        '"My dear Mr. Bennet," said his lady, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."',
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-7',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-elizabeth',
    targetCharacterId: 'char-mr-bennet',
    type: 'allies',
    strength: 8,
    description: {
      text: 'A shared affinity for sharp wit and ironic detachment from social folly.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-7',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-1',
      chapterTitle: 'Chapter 1: The Arrival at Netherfield',
      startOffset: 1400,
      endOffset: 1530,
      passage:
        "Mr. Bennet openly acknowledged Elizabeth's superior quickness of mind among his daughters.",
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-8',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-elizabeth',
    targetCharacterId: 'char-charlotte',
    type: 'allies',
    strength: 7,
    description: {
      text: 'Intimate childhood friendship challenged by contrasting philosophies of marital practicality.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-8',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-1',
      chapterTitle: 'Chapter 1: The Arrival at Netherfield',
      startOffset: 1600,
      endOffset: 1720,
      passage:
        "Elizabeth recounted Darcy's slight to Charlotte with spirited laughter and affectionate candor.",
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-9',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-darcy',
    targetCharacterId: 'char-catherine',
    type: 'family',
    strength: 5,
    description: {
      text: "Nephew and aunt relationship characterized by Lady Catherine's entitlement and Darcy's quiet independence.",
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-9',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-4',
      chapterTitle: 'Chapter 4: The Arrival of Mr. Collins',
      startOffset: 50,
      endOffset: 180,
      passage:
        "Mr. Collins boasted ceaselessly of Lady Catherine's patronage and her high plans for Mr. Darcy.",
    },
    firstObservedChapter: 4,
  },
  {
    id: 'rel-10',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-lydia',
    targetCharacterId: 'char-mrs-bennet',
    type: 'family',
    strength: 7,
    description: {
      text: 'Indulgent mother and spoiled youngest daughter who share an obsession with regimental officers.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-10',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-2',
      chapterTitle: 'Chapter 2: The Meryton Assembly',
      startOffset: 500,
      endOffset: 650,
      passage: "Mrs. Bennet encouraged Lydia's clamour to witness the militia parade into Meryton.",
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-11',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-lydia',
    targetCharacterId: 'char-wickham',
    type: 'romance',
    strength: 7,
    description: {
      text: 'Reckless infatuation culminating in social scandal and an elopement without fortune.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-11',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-5',
      chapterTitle: 'Chapter 5: Wickham’s Revelations',
      startOffset: 150,
      endOffset: 290,
      passage:
        'Lydia openly giggled and sought Mr. Wickham’s arm during every stroll through Meryton.',
    },
    firstObservedChapter: 3,
  },
  {
    id: 'rel-12',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-elizabeth',
    targetCharacterId: 'char-catherine',
    type: 'rivals',
    strength: 8,
    description: {
      text: 'Spirited clash between aristocratic intimidation and Elizabeth’s defiant self-possession.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-12',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-4',
      chapterTitle: 'Chapter 4: The Arrival of Mr. Collins',
      startOffset: 120,
      endOffset: 240,
      passage: 'Elizabeth refused to be overawed by Lady Catherine’s imperious social judgments.',
    },
    firstObservedChapter: 4,
  },
  {
    id: 'rel-13',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-elizabeth',
    targetCharacterId: 'char-wickham',
    type: 'co_occurrence',
    strength: 6,
    description: {
      text: 'Temporary mutual flirtation sustained by shared antipathy toward Mr. Darcy.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-13',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-5',
      chapterTitle: 'Chapter 5: Wickham’s Revelations',
      startOffset: 300,
      endOffset: 450,
      passage:
        'Elizabeth listened intently to Wickham’s grievance, swayed completely by his handsome address.',
    },
    firstObservedChapter: 3,
  },
  {
    id: 'rel-14',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-bingley',
    targetCharacterId: 'char-elizabeth',
    type: 'allies',
    strength: 7,
    description: {
      text: 'Warm fraternal respect and shared pleasure in Jane’s happiness.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-14',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-3',
      chapterTitle: 'Chapter 3: Jane at Netherfield',
      startOffset: 100,
      endOffset: 220,
      passage:
        'Bingley welcomed Elizabeth warmly to Netherfield, expressing earnest gratitude for her presence.',
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-15',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-mr-bennet',
    targetCharacterId: 'char-jane',
    type: 'family',
    strength: 7,
    description: {
      text: 'Affectionate parental admiration, though he occasionally laughs at her inability to see fault in anyone.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-15',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-1',
      chapterTitle: 'Chapter 1: The Arrival at Netherfield',
      startOffset: 450,
      endOffset: 550,
      passage: 'Mr. Bennet commended Jane for her good sense and agreeable disposition.',
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-16',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-mrs-bennet',
    targetCharacterId: 'char-jane',
    type: 'family',
    strength: 7,
    description: {
      text: 'Ambitious promotion of Jane as the beauty of the family whose marriage will secure their fortune.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-16',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-1',
      chapterTitle: 'Chapter 1: The Arrival at Netherfield',
      startOffset: 560,
      endOffset: 680,
      passage:
        'Mrs. Bennet incessantly praised Jane’s beauty, convinced Mr. Bingley would propose within months.',
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-17',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-lydia',
    targetCharacterId: 'char-elizabeth',
    type: 'family',
    strength: 5,
    description: {
      text: 'Sisters separated by moral outlook; Elizabeth cautions against Lydia’s uncurbed vanity.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-17',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-2',
      chapterTitle: 'Chapter 2: The Meryton Assembly',
      startOffset: 300,
      endOffset: 420,
      passage: 'Elizabeth sighed at Lydia’s unabashed vanity during the assembly ball.',
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-18',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-charlotte',
    targetCharacterId: 'char-mrs-bennet',
    type: 'co_occurrence',
    strength: 4,
    description: {
      text: 'Polite neighbourly toleration laced with competitive anxiety over eligible bachelor prospects.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-18',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-4',
      chapterTitle: 'Chapter 4: The Arrival of Mr. Collins',
      startOffset: 200,
      endOffset: 320,
      passage:
        'Mrs. Bennet spoke coldly of the Lucas family after Charlotte’s engagement was confirmed.',
    },
    firstObservedChapter: 1,
  },
  {
    id: 'rel-19',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-bingley',
    targetCharacterId: 'char-catherine',
    type: 'co_occurrence',
    strength: 4,
    description: {
      text: 'Distant aristocratic acquaintance linked by common circles in London and Hertfordshire.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-19',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-6',
      chapterTitle: 'Chapter 6: The Netherfield Ball',
      startOffset: 400,
      endOffset: 500,
      passage:
        'Bingley politely acknowledged Darcy’s distinguished relations when discussion turned to Rosings.',
    },
    firstObservedChapter: 4,
  },
  {
    id: 'rel-20',
    bookId: 'book-pride-and-prejudice',
    sourceCharacterId: 'char-mr-bennet',
    targetCharacterId: 'char-wickham',
    type: 'rivals',
    strength: 7,
    description: {
      text: 'Scornful contempt for Wickham’s impudence and extortionate debts.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-rel-20',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-5',
      chapterTitle: 'Chapter 5: Wickham’s Revelations',
      startOffset: 500,
      endOffset: 620,
      passage: 'Mr. Bennet remarked with sardonic relish on Wickham’s convenient tale of woe.',
    },
    firstObservedChapter: 3,
  },
];

// Study Book: Principles of Cognitive Science
export const SAMPLE_STUDY_BOOK: Book = {
  id: 'book-cognitive-science',
  title: 'Principles of Cognitive Science',
  author: 'Dr. Evelyn Vance',
  mode: 'study',
  format: 'epub',
  language: 'en',
  dir: 'ltr',
  progressPercent: 45,
  currentPosition: {
    chapterId: 'cog-ch-2',
    offset: 420,
  },
  lastReadAt: new Date(Date.now() - 7200000).toISOString(),
  totalChapters: 4,
  shelf: 'reading',
  tags: ['Psychology', 'Neuroscience', 'Textbook'],
  featureStatuses: {
    textExtraction: 'ready',
    concepts: 'ready',
    studyCards: 'ready',
    askBook: 'ready',
    keyPoints: 'ready',
  },
};

export const SAMPLE_STUDY_CHAPTERS: Chapter[] = [
  {
    id: 'cog-ch-1',
    index: 1,
    title: 'Chapter 1: The Architecture of Memory',
    wordCount: 3200,
    characterCount: 19800,
    paragraphs: [
      {
        offset: 0,
        text: 'Human memory is not a passive recording device, but an active, reconstructive cognitive system divided into sensory register, working memory, and long-term storage.',
      },
      {
        offset: 170,
        text: 'Working memory operates as an active mental workspace with finite capacity, heavily modulated by the central executive and phonological loop.',
      },
    ],
    summary: {
      text: 'Foundational models of human memory systems, focusing on the Multi-Store model and Baddeley’s Working Memory framework.',
      status: 'ready',
    },
  },
  {
    id: 'cog-ch-2',
    index: 2,
    title: 'Chapter 2: Cognitive Load & Schema Theory',
    wordCount: 2900,
    characterCount: 18200,
    paragraphs: [
      {
        offset: 0,
        text: 'Cognitive Load Theory distinguishes between intrinsic, extraneous, and germane cognitive load during learning tasks. Instructional design aims to minimize extraneous load.',
      },
      {
        offset: 180,
        text: 'Schemas represent organized mental frameworks of knowledge that allow experts to chunk complex information, freeing working memory capacity.',
      },
    ],
    summary: {
      text: 'Analysis of how schema acquisition alleviates working memory bottlenecks in complex problem solving.',
      status: 'ready',
    },
  },
  {
    id: 'cog-ch-3',
    index: 3,
    title: 'Chapter 3: Neural Plasticity & Hebbian Learning',
    wordCount: 3400,
    characterCount: 21000,
    paragraphs: [
      {
        offset: 0,
        text: "Neural plasticity refers to the brain's capacity to reorganize synaptic connections in response to experience and deliberate training.",
      },
      {
        offset: 160,
        text: 'Hebb’s postulate famously states: neurons that fire together, wire together. Long-term potentiation serves as the cellular basis for memory consolidation.',
      },
    ],
    summary: {
      text: 'Synaptic mechanisms underlying learning, long-term potentiation, and experiential cortical reorganization.',
      status: 'ready',
    },
  },
  {
    id: 'cog-ch-4',
    index: 4,
    title: 'Chapter 4: Metacognition & Desirable Difficulties',
    wordCount: 2600,
    characterCount: 16400,
    paragraphs: [
      {
        offset: 0,
        text: "Metacognition encompasses the awareness and regulation of one's own learning processes, including monitoring confidence and assessing comprehension.",
      },
      {
        offset: 170,
        text: 'Desirable difficulties—such as spaced repetition, interleaving, and active retrieval practice—induce effortful processing that enhances durable retention.',
      },
    ],
    summary: {
      text: 'Practical study strategies based on active recall, spaced intervals, and metacognitive calibration.',
      status: 'ready',
    },
  },
];

export const SAMPLE_CONCEPTS: Concept[] = [
  {
    id: 'concept-wm',
    bookId: 'book-cognitive-science',
    name: 'Working Memory',
    description: {
      text: 'A limited-capacity cognitive system responsible for temporarily holding and manipulating information during complex reasoning.',
      status: 'ready',
    },
    chapterId: 'cog-ch-1',
    chapterIndex: 1,
    isImportant: true,
    mentionCount: 64,
  },
  {
    id: 'concept-clt',
    bookId: 'book-cognitive-science',
    name: 'Cognitive Load',
    description: {
      text: 'The total amount of mental effort being used in the working memory during learning or task execution.',
      status: 'ready',
    },
    chapterId: 'cog-ch-2',
    chapterIndex: 2,
    isImportant: true,
    mentionCount: 52,
  },
  {
    id: 'concept-schema',
    bookId: 'book-cognitive-science',
    name: 'Schema Theory',
    description: {
      text: 'Mental structures that organize knowledge into categorized, reusable cognitive units for rapid retrieval.',
      status: 'ready',
    },
    chapterId: 'cog-ch-2',
    chapterIndex: 2,
    isImportant: true,
    mentionCount: 48,
  },
  {
    id: 'concept-plasticity',
    bookId: 'book-cognitive-science',
    name: 'Neural Plasticity',
    description: {
      text: 'The biological ability of the central nervous system to adapt its structure and function to learning or environmental change.',
      status: 'ready',
    },
    chapterId: 'cog-ch-3',
    chapterIndex: 3,
    isImportant: false,
    mentionCount: 38,
  },
  {
    id: 'concept-hebbian',
    bookId: 'book-cognitive-science',
    name: 'Hebbian Learning',
    description: {
      text: 'A neuroscientific rule postulating that simultaneous activation of cells leads to pronounced increases in synaptic strength.',
      status: 'ready',
    },
    chapterId: 'cog-ch-3',
    chapterIndex: 3,
    isImportant: false,
    mentionCount: 31,
  },
  {
    id: 'concept-metacog',
    bookId: 'book-cognitive-science',
    name: 'Metacognition',
    description: {
      text: 'Higher-order cognitive monitoring of one’s own knowledge acquisition and comprehension calibration.',
      status: 'ready',
    },
    chapterId: 'cog-ch-4',
    chapterIndex: 4,
    isImportant: true,
    mentionCount: 42,
  },
];

export const SAMPLE_CONCEPT_LINKS: ConceptLink[] = [
  {
    id: 'link-1',
    bookId: 'book-cognitive-science',
    sourceConceptId: 'concept-wm',
    targetConceptId: 'concept-clt',
    type: 'leads_to',
    description: {
      text: 'Capacity limitations in working memory directly define the boundaries of cognitive load.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-link-1',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-2',
      chapterTitle: 'Chapter 2: Cognitive Load & Schema Theory',
      startOffset: 0,
      endOffset: 150,
      passage:
        'Cognitive Load Theory distinguishes between intrinsic and extraneous load, measuring strain against working memory limits.',
    },
  },
  {
    id: 'link-2',
    bookId: 'book-cognitive-science',
    sourceConceptId: 'concept-schema',
    targetConceptId: 'concept-wm',
    type: 'prerequisite',
    description: {
      text: 'Schema chunking enables the retrieval of complex ideas as a single working memory unit.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-link-2',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-2',
      chapterTitle: 'Chapter 2: Cognitive Load & Schema Theory',
      startOffset: 180,
      endOffset: 300,
      passage:
        'Schemas allow experts to chunk complex information, freeing working memory capacity for higher-level synthesis.',
    },
  },
  {
    id: 'link-3',
    bookId: 'book-cognitive-science',
    sourceConceptId: 'concept-plasticity',
    targetConceptId: 'concept-hebbian',
    type: 'related',
    description: {
      text: 'Hebbian synaptic remodeling is the primary micro-mechanism of neural plasticity.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-link-3',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-3',
      chapterTitle: 'Chapter 3: Neural Plasticity & Hebbian Learning',
      startOffset: 160,
      endOffset: 290,
      passage:
        'Hebb’s postulate—neurons that fire together, wire together—explains synaptic consolidation at the cellular level.',
    },
  },
  {
    id: 'link-4',
    bookId: 'book-cognitive-science',
    sourceConceptId: 'concept-metacog',
    targetConceptId: 'concept-clt',
    type: 'related',
    description: {
      text: 'Accurate metacognitive regulation helps learners choose strategies that reduce extraneous cognitive load.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-link-4',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-4',
      chapterTitle: 'Chapter 4: Metacognition & Desirable Difficulties',
      startOffset: 0,
      endOffset: 150,
      passage:
        "Metacognition encompasses the awareness and regulation of one's own learning processes to navigate mental difficulty.",
    },
  },
];

export const SAMPLE_KEY_POINTS: KeyPoint[] = [
  {
    id: 'kp-1',
    bookId: 'book-cognitive-science',
    chapterId: 'cog-ch-1',
    chapterIndex: 1,
    title: 'Working memory capacity is strictly bounded',
    content: {
      text: 'The standard working memory capacity is constrained to 4±1 chunks of information at any given moment.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-kp-1',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-1',
      chapterTitle: 'Chapter 1: The Architecture of Memory',
      startOffset: 170,
      endOffset: 290,
      passage:
        'Working memory operates as an active mental workspace with finite capacity, heavily modulated by the central executive.',
    },
    isImportant: true,
  },
  {
    id: 'kp-2',
    bookId: 'book-cognitive-science',
    chapterId: 'cog-ch-2',
    chapterIndex: 2,
    title: 'Instruction must minimize extraneous load',
    content: {
      text: 'Cluttered design or split-attention formatting wastes precious cognitive capacity on navigation instead of schema construction.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-kp-2',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-2',
      chapterTitle: 'Chapter 2: Cognitive Load & Schema Theory',
      startOffset: 0,
      endOffset: 150,
      passage:
        'Cognitive Load Theory distinguishes between intrinsic, extraneous, and germane cognitive load during learning tasks.',
    },
    isImportant: true,
  },
  {
    id: 'kp-3',
    bookId: 'book-cognitive-science',
    chapterId: 'cog-ch-4',
    chapterIndex: 4,
    title: 'Effortful retrieval produces durable learning',
    content: {
      text: 'Testing and active recall outperform passive rereading because difficult retrieval solidifies neural access pathways.',
      status: 'ready',
    },
    evidence: {
      id: 'ev-kp-3',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-4',
      chapterTitle: 'Chapter 4: Metacognition & Desirable Difficulties',
      startOffset: 170,
      endOffset: 310,
      passage:
        'Desirable difficulties—such as spaced repetition and active retrieval practice—induce effortful processing that enhances durable retention.',
    },
    isImportant: false,
  },
];

// Scripts test book: Devanagari (Hindi) & Arabic (RTL)
export const SAMPLE_SCRIPTS_BOOK: Book = {
  id: 'book-scripts-test',
  title: 'World Scripts & Sacred Texts',
  author: 'Anthology of Classical Literature',
  mode: 'study',
  format: 'txt',
  language: 'hi',
  dir: 'ltr',
  progressPercent: 10,
  currentPosition: {
    chapterId: 'script-ch-1',
    offset: 0,
  },
  lastReadAt: new Date(Date.now() - 86400000).toISOString(),
  totalChapters: 2,
  shelf: 'want_to_read',
  tags: ['Multilingual', 'Scripts', 'Hindi', 'Arabic'],
  featureStatuses: {
    textExtraction: 'ready',
    concepts: 'ready',
    studyCards: 'skipped',
    askBook: 'ready',
  },
};

export const SAMPLE_SCRIPTS_CHAPTERS: Chapter[] = [
  {
    id: 'script-ch-1',
    index: 1,
    title: 'अध्याय १: गीता का उपदेश (Devanagari / Hindi)',
    wordCount: 820,
    characterCount: 5400,
    paragraphs: [
      {
        offset: 0,
        text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥ इस श्लोक का अर्थ है कि मनुष्य को केवल कर्म करने का अधिकार है, उसके फल पर कभी नहीं।',
      },
      {
        offset: 175,
        text: 'ज्ञान योग और कर्म योग दोनों का लक्ष्य एक ही सत्य की खोज है। जब मन एकाग्र और निष्काम होता है, तब आत्मज्ञान का प्रकाश उत्पन्न होता है।',
      },
    ],
    summary: {
      text: 'श्रीमद्भगवद्गीता के द्वितीय अध्याय से कर्मयोग के मूल सिद्धांतों की व्याख्या।',
      status: 'ready',
      provenance: 'AI translation and summary in Hindi',
    },
    authorIdea: {
      text: 'कर्तव्य पालन और फल की आसक्ति से मुक्ति ही मानसिक शांति का सनातन मार्ग है।',
      status: 'ready',
    },
  },
  {
    id: 'script-ch-2',
    index: 2,
    title: 'الفصل الثاني: حكمة اللغة (Arabic / RTL)',
    wordCount: 750,
    characterCount: 4800,
    paragraphs: [
      {
        offset: 0,
        text: 'العلم في الصغر كالنقش على الحجر. القراءة مفتاح المعرفة ونور العقل، ومن طلب العلا سهر الليالي وسعى بجد وإخلاص.',
      },
      {
        offset: 120,
        text: 'إن الفهم العميق للنصوص يتطلب التأمل والتدبر، وليس مجرد الحفظ الظاهري للكلمات. فالحكمة ضالة المؤمن أينما وجدها فهو أحق بها.',
      },
    ],
    summary: {
      text: 'مقدمة في بلاغة الحكمة العربية وأهمية طلب العلم والتدبر.',
      status: 'ready',
      provenance: 'Arabic textual analysis',
    },
  },
];

export const ALL_SAMPLE_BOOKS: Book[] = [SAMPLE_NOVEL_BOOK, SAMPLE_STUDY_BOOK, SAMPLE_SCRIPTS_BOOK];

export const SAMPLE_MARKS: Mark[] = [
  {
    id: 'mark-1',
    bookId: 'book-pride-and-prejudice',
    chapterId: 'ch-1',
    chapterIndex: 1,
    chapterTitle: 'Chapter 1: The Arrival at Netherfield',
    type: 'bookmark',
    startOffset: 1420,
    endOffset: 1420,
    selectedText: 'Bookmark at Chapter 1',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'mark-2',
    bookId: 'book-pride-and-prejudice',
    chapterId: 'ch-1',
    chapterIndex: 1,
    chapterTitle: 'Chapter 1: The Arrival at Netherfield',
    type: 'highlight',
    meaning: 'important',
    startOffset: 0,
    endOffset: 104,
    selectedText:
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    noteText: 'Famous opening irony highlighting societal economics.',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'mark-3',
    bookId: 'book-cognitive-science',
    chapterId: 'cog-ch-1',
    chapterIndex: 1,
    chapterTitle: 'Chapter 1: The Architecture of Memory',
    type: 'highlight',
    meaning: 'definition',
    startOffset: 170,
    endOffset: 290,
    selectedText:
      'Working memory operates as an active mental workspace with finite capacity, heavily modulated by the central executive.',
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    updatedAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: 'mark-4',
    bookId: 'book-cognitive-science',
    chapterId: 'cog-ch-4',
    chapterIndex: 4,
    chapterTitle: 'Chapter 4: Metacognition & Desirable Difficulties',
    type: 'highlight',
    meaning: 'question',
    startOffset: 170,
    endOffset: 310,
    selectedText:
      'Desirable difficulties—such as spaced repetition and active retrieval practice—induce effortful processing.',
    noteText: 'How can we best balance difficulty without causing cognitive overload?',
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    updatedAt: new Date(Date.now() - 14400000).toISOString(),
  },
];

export const SAMPLE_VOCABULARY: VocabEntry[] = [
  {
    id: 'vocab-1',
    bookId: 'book-pride-and-prejudice',
    word: 'obsequious',
    meaningInContext: {
      text: 'Excessively obedient or attentive in order to curry favor; servile and fawning.',
      status: 'ready',
      provenance: 'Word meaning in context of Mr. Collins',
    },
    otherSenses: ['cringing', 'servile', 'sycophantic'],
    sourcePassage: {
      id: 'ev-vocab-1',
      bookId: 'book-pride-and-prejudice',
      chapterId: 'ch-4',
      chapterTitle: 'Chapter 4: The Arrival of Mr. Collins',
      startOffset: 0,
      endOffset: 180,
      passage:
        'Mr. Collins presented his obsequious devotion to Lady Catherine with self-congratulatory deference.',
    },
    mastery: 'learning',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'vocab-2',
    bookId: 'book-cognitive-science',
    word: 'potentiation',
    meaningInContext: {
      text: 'The increase in strength of nerve impulses along pathways that have been used previously.',
      status: 'ready',
    },
    otherSenses: ['synergistic enhancement', 'amplification'],
    sourcePassage: {
      id: 'ev-vocab-2',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-3',
      chapterTitle: 'Chapter 3: Neural Plasticity & Hebbian Learning',
      startOffset: 160,
      endOffset: 280,
      passage:
        'Long-term potentiation serves as the primary cellular model for synaptic memory consolidation.',
    },
    mastery: 'reviewing',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
];

export const SAMPLE_DECKS: Deck[] = [
  {
    id: 'deck-cog-all',
    bookId: 'book-cognitive-science',
    title: 'All Chapters Core Decks',
    cardCount: 12,
    dueCount: 4,
  },
  {
    id: 'deck-cog-ch1',
    bookId: 'book-cognitive-science',
    chapterId: 'cog-ch-1',
    title: 'Chapter 1: Memory Architecture',
    cardCount: 6,
    dueCount: 2,
  },
];

export const SAMPLE_CARDS: Card[] = [
  {
    id: 'card-1',
    bookId: 'book-cognitive-science',
    deckId: 'deck-cog-all',
    chapterId: 'cog-ch-1',
    front: 'What is the primary constraint of human working memory?',
    back: 'It has a limited capacity typically measured as 4±1 chunks of information and is prone to rapid decay without rehearsal.',
    evidence: {
      id: 'ev-card-1',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-1',
      chapterTitle: 'Chapter 1: The Architecture of Memory',
      startOffset: 170,
      endOffset: 290,
      passage:
        'Working memory operates as an active mental workspace with finite capacity, heavily modulated by the central executive.',
    },
    box: 2,
    nextReviewDate: new Date().toISOString(),
    isAiGenerated: true,
  },
  {
    id: 'card-2',
    bookId: 'book-cognitive-science',
    deckId: 'deck-cog-all',
    chapterId: 'cog-ch-2',
    front: 'How does schema acquisition relieve working memory bottleneck?',
    back: 'By organizing disparate pieces of information into a single unified chunk, complex concepts can be processed with minimal cognitive load.',
    evidence: {
      id: 'ev-card-2',
      bookId: 'book-cognitive-science',
      chapterId: 'cog-ch-2',
      chapterTitle: 'Chapter 2: Cognitive Load & Schema Theory',
      startOffset: 180,
      endOffset: 300,
      passage:
        'Schemas allow experts to chunk complex information, freeing working memory capacity for higher-level synthesis.',
    },
    box: 1,
    nextReviewDate: new Date().toISOString(),
    isAiGenerated: true,
  },
];

export const SAMPLE_QA_HISTORY: QaMessage[] = [
  {
    id: 'qa-1',
    bookId: 'book-cognitive-science',
    role: 'user',
    content: {
      text: 'Why does cramming fail compared to spaced practice?',
      status: 'ready',
    },
    scope: 'book',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'qa-2',
    bookId: 'book-cognitive-science',
    role: 'assistant',
    content: {
      text: 'Cramming produces short-term familiarity without triggering durable synaptic potentiation. In contrast, spaced practice creates "desirable difficulties" that force the brain to actively reconstruct memory pathways, strengthening neural consolidation across sleep cycles.',
      status: 'ready',
      provenance:
        'Synthesized from Chapter 3 (Neural Plasticity) and Chapter 4 (Desirable Difficulties)',
    },
    citations: [
      {
        id: 'ev-qa-1',
        bookId: 'book-cognitive-science',
        chapterId: 'cog-ch-4',
        chapterTitle: 'Chapter 4: Metacognition & Desirable Difficulties',
        startOffset: 170,
        endOffset: 310,
        passage:
          'Desirable difficulties—such as spaced repetition and active retrieval practice—induce effortful processing that enhances durable retention.',
      },
    ],
    scope: 'book',
    createdAt: new Date(Date.now() - 3550000).toISOString(),
  },
];

export const SAMPLE_JOBS: Job[] = [
  {
    id: 'job-1',
    bookId: 'book-pride-and-prejudice',
    bookTitle: 'Pride and Prejudice',
    status: 'ready',
    stages: [
      { name: 'Checking the file', status: 'ready', progressPercent: 100 },
      { name: 'Finding chapters', status: 'ready', progressPercent: 100 },
      { name: 'Mapping people or ideas', status: 'ready', progressPercent: 100 },
      { name: 'Building the question index', status: 'ready', progressPercent: 100 },
      { name: 'Preparing study cards', status: 'ready', progressPercent: 100 },
    ],
    costUsd: 0.042,
    totalDurationSeconds: 48,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'job-2',
    bookId: 'book-cognitive-science',
    bookTitle: 'Principles of Cognitive Science',
    status: 'ready',
    stages: [
      { name: 'Checking the file', status: 'ready', progressPercent: 100 },
      { name: 'Finding chapters', status: 'ready', progressPercent: 100 },
      { name: 'Mapping people or ideas', status: 'ready', progressPercent: 100 },
      { name: 'Building the question index', status: 'ready', progressPercent: 100 },
      { name: 'Preparing study cards', status: 'ready', progressPercent: 100 },
    ],
    costUsd: 0.038,
    totalDurationSeconds: 42,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: 'job-3',
    bookId: 'book-scripts-test',
    bookTitle: 'World Scripts & Sacred Texts',
    status: 'ready',
    stages: [
      { name: 'Checking the file', status: 'ready', progressPercent: 100 },
      { name: 'Finding chapters', status: 'ready', progressPercent: 100 },
      { name: 'Mapping people or ideas', status: 'ready', progressPercent: 100 },
      { name: 'Building the question index', status: 'ready', progressPercent: 100 },
      {
        name: 'Preparing study cards',
        status: 'skipped',
        errorMessage: 'Cards disabled for sacred anthology',
      },
    ],
    costUsd: 0.015,
    totalDurationSeconds: 19,
    createdAt: new Date(Date.now() - 21600000).toISOString(),
  },
];
