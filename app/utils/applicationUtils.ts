import { useApplicationStore } from '../store/applicationStore';

export const getApplicationIdFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('applicationId');
};

export const loadSavedApplication = (applicationId: string | null) => {
  if (!applicationId) return null;
  
  const store = useApplicationStore.getState();
  return store.getDraftById(applicationId);
};

export const updateApplicationProgress = (
  applicationId: string, 
  stage: string, 
  percentage: number, 
  formData: any
) => {
  const store = useApplicationStore.getState();
  const currentDate = new Date();
  
  store.updateDraft(applicationId, {
    status: {
      stage,
      percentage,
    },
    lastUpdated: {
      date: currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      }),
      time: currentDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })
    },
    formData: {
      ...store.getDraftById(applicationId)?.formData,
      ...formData
    }
  });
}; 