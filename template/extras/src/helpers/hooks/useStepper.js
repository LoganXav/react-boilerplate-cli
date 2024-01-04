import { useReducer } from "react";

/**
 *
 * @param {StepperOptions} options
 * @returns
 */
function useStepper(options = {}) {
  const initialStep = options?.initialStep || 0;
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    return {
      step: initialStep,
      jumped: [],
      skipped: [],
      completed: [],
      errored: [],
      history: [initialStep],
    };
  });

  /**
   *
   * @param {number} step
   */
  function go(step) {
    if (!step || step === state.step) return;
    if (step > state.step) {
      next(step);
    } else {
      previous(step);
    }
  }

  /**
   *
   * @param {number} step
   */
  function next(step) {
    dispatch({ type: "NEXT", payload: { step } });
  }

  /**
   *
   * @param {number} step
   */
  function previous(step) {
    dispatch({ type: "PREVIOUS", payload: { step } });
  }

  /**
   *
   * @param {number} step
   */
  function reset(step = initialStep) {
    dispatch({ type: "RESET", payload: { step, initialStep } });
  }

  return { ...state, next, previous, reset, go };
}

export default useStepper;

/**
 *
 * @param {State} state
 * @returns {State}
 */
function reducer(state, { type, payload }) {
  switch (type) {
    case "NEXT": {
      if (payload?.step === state.step) {
        return state;
      }
      const step =
        !isNaN(payload?.step) && parseInt(payload?.step) >= state.step
          ? parseInt(payload.step)
          : state.step + 1;

      const jumped = [...state.jumped];
      if (step > state.step + 1) {
        for (let index = state.step + 1; index < step; index++) {
          if (!jumped.includes(index)) {
            jumped.push(index);
          }
        }
      }

      return { ...state, step, jumped, history: [...state.history, step] };
    }
    case "PREVIOUS": {
      if (payload?.step === state.step) {
        return state;
      }

      let jumped = [...state.jumped];

      const getNextStep = (step) => {
        const stepIndex = jumped.indexOf(step);
        if (stepIndex > -1) {
          jumped.splice(stepIndex, 1);
          return getNextStep(step - 1);
        }
        return step;
      };

      const step =
        !isNaN(payload?.step) &&
        parseInt(payload?.step) <= state.step &&
        parseInt(payload?.step) >= 0
          ? parseInt(payload.step)
          : state.step
          ? getNextStep(state.step - 1)
          : 0;

      jumped = jumped.filter((jump) => jump < step);

      return { ...state, step, jumped, history: [...state.history, step] };
    }
    case "RESET": {
      const step = parseInt(payload.step)
        ? parseInt(payload.step)
        : payload.initialStep;
      return { ...state, step, jumped: [], history: [step] };
    }
    default:
      return state;
  }
}

/**
 * @typedef {{
 * initialStep: number;
 * }} StepperOptions
 */

/**
 * @typedef {{
 * step: number;
 * jumped: number[]
 * skipped: number[]
 * completed: number[]
 * errored: number[]
 * }} State
 */
