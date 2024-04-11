import { FC, useCallback, useEffect, useMemo, useReducer } from 'react';
import { wizardReducer } from './data/wizard.reducer.ts';
import { initialData, WizardConfig } from './data/wizard.data.ts';
import { WizardContext, WizardDispatchContext } from './data/wizard.context.ts';
import { WizardHeader } from './components/WizardHeader.tsx';
import { openNextAction, openPrevAction, setActiveStepAction, setStepsAction } from './data/wizard.actions.ts';
import { WizardContent } from './components/WizardContent.tsx';
import { WizardActions } from './components/WizardActions.tsx';
import { WizardHeaderLabelTranslations } from './components/WizardHeaderLabel.tsx';


interface WizardProps extends WizardHeaderLabelTranslations {
    steps?: WizardConfig['steps'];
    activeStep?: WizardConfig['activeStep'];
    onFinish?: () => void;
}

/**
 * Generic Wizard made for Orbify challenge purposes
 * (to show how scalable application can be made)
 * @constructor
 */
export const Wizard: FC<WizardProps> = ({
                                            steps,
                                            activeStep,
                                            pendingLabel,
                                            completedLabel,
                                            inProgressLabel,
                                            onFinish: handleFinish
                                        }) => {
    const [wizardConfig, dispatch] = useReducer(wizardReducer, initialData);
    const content = useMemo(() => {
        if (wizardConfig.activeStep !== undefined
            && wizardConfig.steps?.length
            && wizardConfig.steps[wizardConfig.activeStep]?.content) {
            return wizardConfig.steps[wizardConfig.activeStep]?.content;
        }
    }, [wizardConfig]);

    useEffect(() => {
        if (steps) {
            setStepsAction(dispatch, steps);
        }
    }, [steps]);

    useEffect(() => {
        if (activeStep) {
            setActiveStepAction(dispatch, activeStep);
        }
    }, [activeStep]);

    const handleBack = useCallback(
        () => {
            openPrevAction(dispatch);
        },
        [dispatch],
    );
    const handleNext = useCallback(
        () => {
            openNextAction(dispatch);
        },
        [dispatch],
    );


    return (
        <WizardContext.Provider value={wizardConfig}>
            <WizardDispatchContext.Provider value={dispatch}>
                <WizardHeader pendingLabel={pendingLabel}
                              inProgressLabel={inProgressLabel}
                              completedLabel={completedLabel}/>
                <WizardContent content={content}/>
                <WizardActions onBack={handleBack} onNext={handleNext} onFinish={handleFinish}/>
            </WizardDispatchContext.Provider>
        </WizardContext.Provider>
    );
};


