import {
  GetCharactersResponse,
  UpdateCharacterPayload,
  MergeCharactersPayload,
  UpdateRelationshipPayload,
  GetCharactersResponseSchema,
} from '@/api/contracts/characters';
import { SAMPLE_CHARACTERS, SAMPLE_RELATIONSHIPS } from '@/mocks/sample-data';
import { simulateDelay } from './simulate';

let characters = [...SAMPLE_CHARACTERS];
let relationships = [...SAMPLE_RELATIONSHIPS];

export const mockCharactersAdapter = {
  async getCharacters(bookId: string): Promise<GetCharactersResponse> {
    await simulateDelay();
    const bookChars = characters.filter((c) => c.bookId === bookId && !c.isHidden);
    const bookRels = relationships.filter((r) => r.bookId === bookId);
    const maxChapter = Math.max(...characters.map((c) => c.firstAppearanceChapter), 6);

    return GetCharactersResponseSchema.parse({
      characters: bookChars,
      relationships: bookRels,
      maxChapter,
    });
  },

  async updateCharacter(id: string, payload: UpdateCharacterPayload): Promise<void> {
    await simulateDelay(40);
    characters = characters.map((c) => {
      if (c.id !== id) return c;
      return {
        ...c,
        ...(payload.name ? { name: payload.name } : {}),
        ...(payload.role ? { role: payload.role } : {}),
        ...(typeof payload.isHidden === 'boolean' ? { isHidden: payload.isHidden } : {}),
      };
    });
  },

  async mergeCharacters(payload: MergeCharactersPayload): Promise<void> {
    await simulateDelay(60);
    characters = characters.map((c) => {
      if (c.id !== payload.sourceCharacterId) return c;
      return {
        ...c,
        isHidden: true,
        mergedIntoId: payload.targetCharacterId,
      };
    });

    relationships = relationships.map((r) => {
      if (r.sourceCharacterId === payload.sourceCharacterId) {
        return { ...r, sourceCharacterId: payload.targetCharacterId, isUserEdited: true };
      }
      if (r.targetCharacterId === payload.sourceCharacterId) {
        return { ...r, targetCharacterId: payload.targetCharacterId, isUserEdited: true };
      }
      return r;
    });
  },

  async updateRelationship(id: string, payload: UpdateRelationshipPayload): Promise<void> {
    await simulateDelay(40);
    relationships = relationships.map((r) => {
      if (r.id !== id) return r;
      return {
        ...r,
        type: payload.type,
        ...(payload.strength ? { strength: payload.strength } : {}),
        isUserEdited: true,
      };
    });
  },
};
