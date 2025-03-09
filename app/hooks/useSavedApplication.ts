import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getApplicationIdFromUrl, loadSavedApplication } from '../utils/applicationUtils';

export function useSavedApplication() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [savedData, setSavedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);

    if (id) {
      const data = loadSavedApplication(id);
      if (data) {
        setSavedData(data.formData);
      } else {
        // If application ID is invalid, redirect to calculator
        router.push('/calculator');
      }
    }
    
    setIsLoading(false);
  }, [router]);

  return {
    applicationId,
    savedData,
    isLoading
  };
} 