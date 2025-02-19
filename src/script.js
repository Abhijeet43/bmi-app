const selectors = Object.freeze({
  form: "bmi-form",
  height: "bmi-height",
  weight: "bmi-weight",
  submitBtn: "bmi-submit",
  bmi: "bmi",
  result: "result",
  category: "bmi-category",
});

const BMI_CONFIG = Object.freeze({
  CATEGORIES: Object.freeze({
    UNDERWEIGHT: { threshold: 18.5, label: "Underweight" },
    HEALTHY: { threshold: 25, label: "Healthy" },
    OVERWEIGHT: { threshold: 30, label: "Overweight" },
    OBESE: { threshold: Infinity, label: "Obese" },
  }),
  DECIMAL_PRECISION: 2,
});

const elements = Object.fromEntries(
  Object.entries(selectors).map(([key, selector]) => [
    key,
    document.getElementById(selector),
  ])
);

function showError(message) {
  alert(message);
}

function calculateBmi(heightCm, weightKg) {
  const heightMeters = heightCm / 100;
  return Number(
    (weightKg / Math.pow(heightMeters, 2)).toFixed(BMI_CONFIG.DECIMAL_PRECISION)
  );
}

function determineBmiCategory(bmi) {
  const { CATEGORIES } = BMI_CONFIG;

  if (bmi < CATEGORIES.UNDERWEIGHT.threshold)
    return CATEGORIES.UNDERWEIGHT.label;
  if (bmi < CATEGORIES.HEALTHY.threshold) return CATEGORIES.HEALTHY.label;
  if (bmi < CATEGORIES.OVERWEIGHT.threshold) return CATEGORIES.OVERWEIGHT.label;
  return CATEGORIES.OBESE.label;
}

function isValidPositiveNumber(input) {
  if (!input) return false;
  const num = parseFloat(input);
  return !Number.isNaN(num) && num > 0 && isFinite(num);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const heightValue = elements.height.value.trim();
  const weightValue = elements.weight.value.trim();

  if (!heightValue || !weightValue) {
    showError("Height and Weight are both required.");
    return;
  }

  if (!isValidPositiveNumber(heightValue)) {
    showError("Please enter a valid positive number for height.");
    return;
  }

  if (!isValidPositiveNumber(weightValue)) {
    showError("Please enter a valid positive number for weight.");
    return;
  }

  const heightCm = parseFloat(heightValue);
  const weightKg = parseFloat(weightValue);
  const bmi = calculateBmi(heightCm, weightKg);
  const category = determineBmiCategory(bmi);

  elements.bmi.innerText = bmi;
  toggleResult();
  elements.category.innerText = category;
}

function toggleResult() {
  bmi > 0
    ? elements.result.classList.add("hidden")
    : elements.result.classList.remove("hidden");
}

elements.form.addEventListener("submit", handleFormSubmit);
