import { Fragment } from 'react';

interface Step {
  id: number;
  labelText: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <section className="stepper">
      {steps.map((step, index) => {
        const isCompleted = currentStep >= index + 1;
        return (
          <Fragment key={step.id}>
            <div className={`stepper__circle-step ${isCompleted ? 'completed' : ''}`}>
              <p className="stepper__count">{index + 1}</p>
            </div>
            {index < steps.length - 1 && <div className="stepper__separator"></div>}
          </Fragment>
        );
      })}
    </section>
  );
};

export default Stepper;
