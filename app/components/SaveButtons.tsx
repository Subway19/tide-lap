import { useRouter } from 'next/navigation';
import { useApplicationStore } from '../store/applicationStore';
import { updateApplicationProgress } from '../utils/applicationUtils';

interface SaveButtonsProps {
  applicationId: string | null;
  currentStage: string;
  percentage: number;
  formData: any;
  nextRoute: string;
  onSave?: () => void;
}

export default function SaveButtons({ 
  applicationId, 
  currentStage, 
  percentage, 
  formData, 
  nextRoute,
  onSave 
}: SaveButtonsProps) {
  const router = useRouter();
  const { addDraft } = useApplicationStore();

  const generateApplicationId = () => {
    const currentDate = new Date();
    return `LAP${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  };

  const handleSave = (shouldContinue: boolean = false) => {
    if (onSave) {
      onSave();
    }

    if (!applicationId) {
      // Create new application draft
      const newApplicationId = generateApplicationId();
      const currentDate = new Date();
      
      addDraft({
        id: newApplicationId,
        type: 'Loan Against Property',
        amount: formData.loanAmount ? new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(formData.loanAmount) : '₹ 0',
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
        status: {
          stage: currentStage,
          percentage
        },
        formData
      });
      
      applicationId = newApplicationId;
    } else {
      // Update existing application
      updateApplicationProgress(applicationId, currentStage, percentage, formData);
    }

    if (shouldContinue) {
      router.push(`${nextRoute}?applicationId=${applicationId}`);
    } else {
      router.push('/application-drafts');
    }
  };

  return (
    <div className="flex gap-4 mt-8">
      <button 
        className="btn-primary flex-1"
        onClick={() => handleSave(true)}
      >
        Save & Continue
      </button>
      <button 
        className="btn-outline flex-1"
        onClick={() => handleSave(false)}
      >
        Save & Exit
      </button>
    </div>
  );
} 