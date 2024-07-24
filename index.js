alert(
  "Kiya lagta ha tere ko teri itni gpa ha ke tere ko gpa calculator ki need pare ?"
);
const form = document.querySelector(".form");
const add = document.querySelector(".add");
const course = document.querySelector(".course");
const Sbtn = document.querySelector("#startedBtn");
const btn = document.querySelector("#Calculate");
const swap = document.querySelector("#switch");
const wel = document.querySelector(".welcome");
const result = document.querySelector(".result");
const input = document.querySelectorAll(".num");
let count = 2;
let flag = 0;
let GPA = (e) => {
  e.value = parseFloat(e.value).toFixed(0);
  if (e.value == "" || e.value == null) {
    return -1;
  } else if (e.value >= 86) {
    return 4;
  } else if (e.value >= 82) {
    return 3.66;
  } else if (e.value >= 78) {
    return 3.33;
  } else if (e.value >= 74) {
    return 3;
  } else if (e.value >= 70) {
    return 2.66;
  } else if (e.value >= 66) {
    return 2.33;
  } else if (e.value >= 62) {
    return 2;
  } else if (e.value >= 58) {
    return 1.66;
  } else if (e.value >= 54) {
    return 1.33;
  } else if (e.value >= 50) {
    return 1;
  } else {
    return 0;
  }
};
let check = (input) => {
  console.log(input);
  if (input.value >= 0 || input.value == "") {
    input.style.border = "1px solid grey";
    return 1;
  } else {
    input.style.border = "2px solid red";
    return 0;
  }
};
let formFiller = () => {
  let error = 0;
  let c = document.querySelectorAll(".nthCourse");
  c.forEach((e) => {
    if (check(e.children[2]) == 0 || check(e.children[1]) == 0) {
      error = 1;
    }
  });
  if (error == 0) {
    return 1;
  } else {
    return 0;
  }
};
input[0].addEventListener("blur", () => {
  if (input[0].value != null && input[0].value != "") {
    input[0].value = parseFloat(input[0].value).toFixed(2);
    check(input[0]);
  }
});
input[1].addEventListener("blur", () => {
  if (input[1].value != null && input[1].value != "") {
    input[1].value = parseFloat(input[1].value).toFixed(0);
    check(input[1]);
  }
});
Sbtn.addEventListener("click", () => {
  wel.classList.add("hide");
  form.classList.remove("hide");
});
add.addEventListener("click", () => {
  const nthCourse = document.querySelector(".nthCourse").cloneNode(true);
  course.appendChild(nthCourse);
  nthCourse.children[0].innerText = `Course ${count}`;
  nthCourse.children[1].value = "";
  nthCourse.children[2].value = "";
  nthCourse.children[1].addEventListener("blur", () => {
    if (
      nthCourse.children[1].value != null &&
      nthCourse.children[1].value != ""
    ) {
      nthCourse.children[1].value = parseFloat(
        nthCourse.children[1].value
      ).toFixed(2);
      check(nthCourse.children[1]);
    }
  });
  nthCourse.children[2].addEventListener("blur", () => {
    if (
      nthCourse.children[2].value != null &&
      nthCourse.children[2].value != ""
    ) {
      nthCourse.children[2].value = parseFloat(
        nthCourse.children[2].value
      ).toFixed(0);
      check(nthCourse.children[2]);
    }
  });
  count++;
});
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (formFiller() == 1) {
    let c = document.querySelectorAll(".nthCourse");
    let gpa = 0,
      fail = 0,
      total = 0;
    c.forEach((e) => {
      if (e.children[2].value != null && e.children[2].value != "") {
        let y = parseFloat(e.children[2].value);
        if (flag == 0) {
          let x = GPA(e.children[1]);
          if (x == 0) {
            fail++;
          } else if (x != -1) {
            x *= y;
            gpa += x;
            total += y;
          }
        } else {
          if (e.children[1].value != "" && e.children[1].value != null) {
            x = parseFloat(e.children[1].value);
            x *= y;
            gpa += x;
            total += y;
          }
        }
      }
    });

    gpa = gpa / total;
    gpa = gpa.toFixed(2);
    result.innerText = `Your GPA is ${gpa}`;
    if (fail > 0) {
      result.innerText += `(except F courses) and you got F in ${fail} courses`;
    }
  } else {
    alert("Chote number tu likhna sikhle baad me gpa calculate krna");
  }
});
swap.addEventListener("click", () => {
  let c = document.querySelectorAll(".nthCourse");
  if (flag == 0) {
    c.forEach((e) => {
      e.children[1].placeholder = "GPA";
    });
    swap.innerText = "TotWgt/CrdtHr";
    flag = 1;
  } else {
    c.forEach((e) => {
      e.children[1].placeholder = "Total Weightage";
    });
    swap.innerText = "GPA/CrdtHr";
    flag = 0;
  }
});
