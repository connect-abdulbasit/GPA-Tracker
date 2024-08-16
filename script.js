const form = document.querySelector(".form");
const add = document.querySelector(".add");
const course = document.querySelector(".course");
const startButton = document.querySelector("#startButton");
const calculateButton = document.querySelector("#calculateButton");
const toggleButton = document.querySelector("#toggleButton");
const welcome = document.querySelector(".welcome");
const result = document.querySelector(".result");
let count = 2;
let isGPAView = false;

const GPA = (value) => {
  if (!value) return -1;
  if (value >= 86) return 4;
  if (value >= 82) return 3.66;
  if (value >= 78) return 3.33;
  if (value >= 74) return 3;
  if (value >= 70) return 2.66;
  if (value >= 66) return 2.33;
  if (value >= 62) return 2;
  if (value >= 58) return 1.66;
  if (value >= 54) return 1.33;
  if (value >= 50) return 1;
  return 0;
};

const isValidInput = (input) => {
  if (input.value >= 0 || input.value === "") {
    input.style.border = "1px solid grey";
    return true;
  } else {
    input.style.border = "2px solid red";
    return false;
  }
};

const validateForm = () => {
  let isValid = true;
  document.querySelectorAll(".nthCourse").forEach((course) => {
    if (
      !isValidInput(course.children[1]) ||
      !isValidInput(course.children[2])
    ) {
      isValid = false;
    }
  });
  return isValid;
};

startButton.addEventListener("click", () => {
  welcome.classList.add("hide");
  form.classList.remove("hide");
});

add.addEventListener("click", () => {
  const nthCourse = document.querySelector(".nthCourse").cloneNode(true);
  course.appendChild(nthCourse);
  nthCourse.children[0].innerText = `Course ${count}`;
  nthCourse.children[1].value = "";
  nthCourse.children[2].value = "";
  count++;
});

calculateButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateForm()) {
    let totalGPA = 0,
      totalCredits = 0,
      failCount = 0;
    document.querySelectorAll(".nthCourse").forEach((course) => {
      const weight = parseFloat(course.children[1].value);
      const credits = parseFloat(course.children[2].value);
      if (weight && credits) {
        let courseGPA = isGPAView ? weight : GPA(weight);
        if (courseGPA === 0) failCount++;
        else if (courseGPA !== -1) {
          totalGPA += courseGPA * credits;
          totalCredits += credits;
        }
      }
    });
    const gpa = (totalGPA / totalCredits).toFixed(2);
    result.innerText =
      `Your GPA is ${gpa}` +
      (failCount > 0
        ? ` (excluding F grades) and you failed in ${failCount} courses`
        : "");
  } else {
    alert("Please enter valid data for all courses.");
  }
});

toggleButton.addEventListener("click", () => {
  isGPAView = !isGPAView;
  document
    .querySelectorAll(".nthCourse input:nth-child(2)")
    .forEach((input) => {
      input.placeholder = isGPAView ? "GPA" : "Total Weightage";
    });
  toggleButton.innerText = isGPAView ? "TotWgt/CrdtHr" : "GPA/CrdtHr";
});
