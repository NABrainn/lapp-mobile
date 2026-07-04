import { createStore } from "@tanstack/react-store";

type TokenStore = {
  selectedTokenId: number | undefined;
  shouldHighlightSelectedToken: boolean;
};

type PhraseModeStore = {
  isPhraseModeEnabled: boolean;
  isPaintingPhrase: boolean;
  startId: number | undefined;
  endId: number | undefined;
};

const initialTokenStore: TokenStore = {
  selectedTokenId: undefined,
  shouldHighlightSelectedToken: true,
};

const initialPhraseModeStore: PhraseModeStore = {
  isPhraseModeEnabled: false,
  isPaintingPhrase: false,
  startId: undefined,
  endId: undefined,
};

export const tokenStore = createStore(initialTokenStore);
export const phraseModeStore = createStore(initialPhraseModeStore);

export const lessonSessionStoreApi = {
  selectToken: (id: number) => {
    tokenStore.setState((state) => ({
      ...state,
      selectedTokenId: id,
    }));
  },
  togglePhraseMode: () => {
    tokenStore.setState((state) => ({
      ...state,
      shouldHighlightSelectedToken: true,
    }));

    phraseModeStore.setState((state) => ({
      ...state,
      isPhraseModeEnabled: !state.isPhraseModeEnabled,
      isPaintingPhrase: false,
      startId: undefined,
      endId: undefined,
    }));
  },
  startPhrasePainting: (id: number) => {
    phraseModeStore.setState((state) => ({
      ...state,
      isPaintingPhrase: true,
      startId: id,
      endId: undefined,
    }));
  },
  finishPhrasePainting: (id: number) => {
    phraseModeStore.setState((state) => ({
      ...state,
      isPaintingPhrase: false,
      endId: id,
    }));
  },
};
