import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';

export interface ApplicationDraft {
  id: string;
  type: 'Loan Against Property';
  amount: string;
  lastUpdated: {
    date: string;
    time: string;
  };
  status: {
    stage: string;
    percentage: number;
  };
  formData: {
    [key: string]: any;
  };
}

interface ApplicationStore {
  applicationDrafts: ApplicationDraft[];
  addDraft: (draft: ApplicationDraft) => void;
  updateDraft: (id: string, data: Partial<ApplicationDraft>) => void;
  deleteDraft: (id: string) => void;
  getDraftById: (id: string) => ApplicationDraft | undefined;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      applicationDrafts: [],
      
      addDraft: (draft) => set((state) => ({
        applicationDrafts: [...state.applicationDrafts, draft]
      })),
      
      updateDraft: (id, data) => set((state) => ({
        applicationDrafts: state.applicationDrafts.map(draft =>
          draft.id === id ? { ...draft, ...data } : draft
        )
      })),
      
      deleteDraft: (id) => set((state) => ({
        applicationDrafts: state.applicationDrafts.filter(draft => draft.id !== id)
      })),
      
      getDraftById: (id) => get().applicationDrafts.find(draft => draft.id === id),
    }),
    {
      name: 'application-storage',
      storage: {
        getItem: (name): StorageValue<ApplicationStore> | null => {
          if (typeof localStorage === 'undefined') return null;
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str) as StorageValue<ApplicationStore>;
        },
        setItem: (name, value: StorageValue<ApplicationStore>): void => {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name): void => {
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(name);
          }
        },
      },
    }
  )
); 