import { NotConnectedError } from '@/api/errors';
import type {
  GetCharactersResponse,
  UpdateCharacterPayload,
  MergeCharactersPayload,
  UpdateRelationshipPayload,
} from '@/api/contracts/characters';

export const httpCharactersAdapter = {
  async getCharacters(_bookId: string): Promise<GetCharactersResponse> {
    throw new NotConnectedError('characters.getCharacters');
  },
  async updateCharacter(_id: string, _payload: UpdateCharacterPayload): Promise<void> {
    throw new NotConnectedError('characters.updateCharacter');
  },
  async mergeCharacters(_payload: MergeCharactersPayload): Promise<void> {
    throw new NotConnectedError('characters.mergeCharacters');
  },
  async updateRelationship(_id: string, _payload: UpdateRelationshipPayload): Promise<void> {
    throw new NotConnectedError('characters.updateRelationship');
  },
};
