// // science.js
// const display = document.getElementById("display");
// let plotMode = false;
// let complexMode = false;

// function appendValue(val) {
//   if (val === 'π') {
//     display.value += Math.PI.toFixed(8);
//   } else if (val === 'i') {
//     display.value += 'i';  // Accept plain 'i'
//   } else {
//     display.value += val;
//   }
// }


// function clearDisplay() {
//   display.value = "";
// }

// function deleteLast() {
//   display.value = display.value.slice(0, -1);
// }

// function enablePlot() {
//   plotMode = true;
//   complexMode = false;
//   display.value = "Click = to enter X and Y values";
// }

// function enableComplex() {
//   complexMode = true;
//   plotMode = false;
//   display.value = "Use format: 2+3i * (4-2i)";
// }

// function calculate() {
//   let expression = display.value.trim();

//   // Handle symbolic derivative
//   if (/^diff\((.+)\)$/i.test(expression)) {
//     const inner = expression.match(/^diff\((.+)\)$/i)[1];
//     try {
//       const simplified = math.simplify(inner).toString();
//       const derivative = math.derivative(inner, 'x').toString();
//       display.value = derivative;
//       document.getElementById("outputBox").innerHTML = `∂/∂x (${simplified}) = <strong>${derivative}</strong>`;
//     } catch (e) {
//       display.value = "Error";
//     }
//     return;
//   }

//   // Handle symbolic integral
//   if (/^int\((.+)\)$/i.test(expression)) {
//     const inner = expression.match(/^int\((.+)\)$/i)[1];
//     try {
//       const simplified = math.simplify(inner).toString();
//       display.value = `∫(${simplified}) dx`;
//       document.getElementById("outputBox").innerHTML = `Integral of (${simplified}) dx = <em>(Symbolic integral placeholder)</em>`;
//     } catch (e) {
//       display.value = "Error";
//     }
//     return;
//   }

//   // Existing plot logic
//   if (plotMode) {
//     let xData = prompt("Enter x values (comma-separated):");
//     let yData = prompt("Enter y values (comma-separated):");

//     if (!xData || !yData) {
//       display.value = "Invalid input!";
//       return;
//     }

//     const x = xData.split(',').map(Number);
//     const y = yData.split(',').map(Number);
//     plotGraph(x, y);
//     display.value = "Graph plotted!";
//     plotMode = false;
//     document.getElementById("outputBox").innerHTML = "Graph: Y vs X plotted successfully.";
//     return;
//   }

//   // Existing complex mode
//   if (complexMode) {
//     try {
//       const result = evaluateComplex(expression);
//       display.value = result;
//       document.getElementById("outputBox").innerHTML = `Result: ${result}`;
//     } catch (e) {
//       display.value = "Error";
//     }
//     return;
//   }

//   // Default math expression evaluation
//   try {
//     expression = expression.replace(/√\(/g, 'Math.sqrt(')
//                            .replace(/sin\(/g, 'Math.sin(')
//                            .replace(/cos\(/g, 'Math.cos(')
//                            .replace(/tan\(/g, 'Math.tan(')
//                            .replace(/log\(/g, 'Math.log10(')
//                            .replace(/ln\(/g, 'Math.log(')
//                            .replace(/π/g, Math.PI)
//                            .replace(/(\d+)!/g, (_, n) => factorial(+n))
//                            .replace(/\^2/g, '**2')
//                            .replace(/(\d+)\^(\d+)/g, (_, base, exp) => `Math.pow(${base},${exp})`);

//     const result = eval(expression);
//     display.value = result;
//     document.getElementById("outputBox").innerHTML = `Result: ${result}`;
//   } catch (e) {
//     display.value = "Error";
//     document.getElementById("outputBox").innerHTML = "Error in expression.";
//   }
// }

// function factorial(n) {
//   if (n < 0) return NaN;
//   if (n === 0 || n === 1) return 1;
//   return n * factorial(n - 1);
// }

// document.addEventListener("keydown", (e) => {
//   const key = e.key;
//   if (!isNaN(key) || "+-*/().".includes(key)) {
//     appendValue(key);
//   } else if (key === "Enter") {
//     e.preventDefault();
//     calculate();
//   } else if (key === "Backspace") {
//     deleteLast();
//   } else if (key === "Escape") {
//     clearDisplay();
//   }
// });

// function plotGraph(x, y) {
//   const ctx = document.getElementById('plotCanvas').getContext('2d');
//   if (window.plotInstance) window.plotInstance.destroy();
//   window.plotInstance = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: x,
//       datasets: [{
//         label: 'Y vs X',
//         data: y,
//         borderColor: '#00ffc3',
//         backgroundColor: 'rgba(0,255,195,0.2)',
//         fill: true,
//         tension: 0.2
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { labels: { color: '#fff' } }
//       },
//       scales: {
//         x: { ticks: { color: '#fff' } },
//         y: { ticks: { color: '#fff' } }
//       }
//     }
//   });
// }
// function evaluateComplex(expr) {
//   expr = expr.replace(/([0-9])i/g, "$1*i"); // Convert 2i to 2*i
//   expr = expr.replace(/i/g, "1i"); // Convert standalone i to 1i

//   const math = {
//     add: (a, b) => ({ re: a.re + b.re, im: a.im + b.im }),
//     sub: (a, b) => ({ re: a.re - b.re, im: a.im - b.im }),
//     mul: (a, b) => ({
//       re: a.re * b.re - a.im * b.im,
//       im: a.re * b.im + a.im * b.re
//     }),
//     div: (a, b) => {
//       const denom = b.re * b.re + b.im * b.im;
//       return {
//         re: (a.re * b.re + a.im * b.im) / denom,
//         im: (a.im * b.re - a.re * b.im) / denom
//       };
//     },
//     parse: (s) => {
//       s = s.replace(/\s+/g, '');
//       let match = s.match(/^([+-]?[0-9.]+)([+-][0-9.]+)i$/);
//       if (!match) throw new Error("Invalid complex format");
//       return { re: parseFloat(match[1]), im: parseFloat(match[2]) };
//     }
//   };

//   const match = expr.match(/(.+)\s*([\+\-\*\/])\s*(.+)/);
//   if (!match) throw new Error("Invalid format");
//   const [_, left, op, right] = match;
//   const a = math.parse(left);
//   const b = math.parse(right);
//   const result = math[{
//     '+': 'add',
//     '-': 'sub',
//     '*': 'mul',
//     '/': 'div'
//   }[op]](a, b);

//   return `${result.re.toFixed(4)} + ${result.im.toFixed(4)}i`;
// }


// function solve2x2() {
//   const a1 = parseFloat(document.getElementById("a1").value);
//   const b1 = parseFloat(document.getElementById("b1").value);
//   const c1 = parseFloat(document.getElementById("c1").value);
//   const a2 = parseFloat(document.getElementById("a2").value);
//   const b2 = parseFloat(document.getElementById("b2").value);
//   const c2 = parseFloat(document.getElementById("c2").value);

//   const D = a1 * b2 - a2 * b1;
//   const Dx = c1 * b2 - c2 * b1;
//   const Dy = a1 * c2 - a2 * c1;

//   let resultBox = document.getElementById("matrixResult");

//   if (D !== 0) {
//     const x = Dx / D;
//     const y = Dy / D;
//     resultBox.innerHTML = `x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`;
//   } else {
//     resultBox.innerHTML = "No unique solution (Determinant = 0)";
//   }
// }






const display = document.getElementById("display");
let plotMode = false;
let complexMode = false;

function appendValue(val) {
  if (val === 'π') {
    display.value += Math.PI.toFixed(8);
  } else if (val === 'i') {
    display.value += 'i';  
  } else {
    display.value += val;
  }
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function enablePlot() {
  plotMode = true;
  complexMode = false;
  display.value = "Click = to enter X and Y values";
}

function enableComplex() {
  complexMode = true;
  plotMode = false;
  display.value = "Use format: 2+3i * (4-2i)";
}

function calculate() {
  let expression = display.value.trim();
  if (/^diff\((.+)\)$/i.test(expression)) {
    const inner = expression.match(/^diff\((.+)\)$/i)[1];
    try {
      const simplified = math.simplify(inner).toString();
      const derivative = math.derivative(inner, 'x').toString();
      display.value = derivative;
      document.getElementById("outputBox").innerHTML = `∂/∂x (${simplified}) = <strong>${derivative}</strong>`;
    } catch (e) {
      display.value = "Error";
    }
    return;
  }
  if (/^int\((.+)\)$/i.test(expression)) {
    const inner = expression.match(/^int\((.+)\)$/i)[1];
    const definiteMatch = inner.match(/^(.+),\s*(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
    if (definiteMatch) {
      const expr = definiteMatch[1];
      const a = parseFloat(definiteMatch[2]);
      const b = parseFloat(definiteMatch[4]);

      try {
        const f = math.evaluate(`f(x) = ${expr}`);
        const N = 1000;
        const h = (b - a) / N;
        let sum = f(a) + f(b);

        for (let i = 1; i < N; i++) {
          const x = a + i * h;
          sum += (i % 2 === 0 ? 2 : 4) * f(x);
        }

        const result = (h / 3) * sum;
        display.value = result.toFixed(6);
        document.getElementById("outputBox").innerHTML =
          `∫(${expr}) dx from ${a} to ${b} = <strong>${result.toFixed(6)}</strong>`;
      } catch (err) {
        display.value = "Error";
        document.getElementById("outputBox").innerHTML = "Error in evaluating function.";
      }
      return;
    } else {
      const expr = inner;
      const a = parseFloat(prompt("Enter lower limit (a):"));
      const b = parseFloat(prompt("Enter upper limit (b):"));
      if (isNaN(a) || isNaN(b)) {
        display.value = "Invalid limits";
        document.getElementById("outputBox").innerHTML = "Provide valid numeric limits.";
        return;
      }

      try {
        const f = math.evaluate(`f(x) = ${expr}`);
        const N = 1000;
        const h = (b - a) / N;
        let sum = f(a) + f(b);

        for (let i = 1; i < N; i++) {
          const x = a + i * h;
          sum += (i % 2 === 0 ? 2 : 4) * f(x);
        }

        const result = (h / 3) * sum;
        display.value = result.toFixed(6);
        document.getElementById("outputBox").innerHTML =
          `∫(${expr}) dx from ${a} to ${b} = <strong>${result.toFixed(6)}</strong>`;
      } catch (e) {
        display.value = "Error";
        document.getElementById("outputBox").innerHTML = "Error during numerical integration.";
      }
      return;
    }
  }
  if (plotMode) {
    let xData = prompt("Enter x values (comma-separated):");
    let yData = prompt("Enter y values (comma-separated):");

    if (!xData || !yData) {
      display.value = "Invalid input!";
      return;
    }

    const x = xData.split(',').map(Number);
    const y = yData.split(',').map(Number);
    plotGraph(x, y);
    display.value = "Graph plotted!";
    plotMode = false;
    document.getElementById("outputBox").innerHTML = "Graph: Y vs X plotted successfully.";
    return;
  }
  if (complexMode) {
    try {
      const result = evaluateComplex(expression);
      display.value = result;
      document.getElementById("outputBox").innerHTML = `Result: ${result}`;
    } catch (e) {
      display.value = "Error";
    }
    return;
  }
  try {
    expression = expression.replace(/√\(/g, 'Math.sqrt(')
                       .replace(/sin\(([^)]+)\)/g, (_, angle) => `Math.sin((${angle}) * Math.PI / 180)`)
                       .replace(/cos\(([^)]+)\)/g, (_, angle) => `Math.cos((${angle}) * Math.PI / 180)`)
                       .replace(/tan\(([^)]+)\)/g, (_, angle) => `Math.tan((${angle}) * Math.PI / 180)`)

                        .replace(/log\(/g, 'Math.log10(')
                        .replace(/ln\(/g, 'Math.log(')
                        .replace(/π/g, Math.PI)
                        .replace(/(\d+)!/g, (_, n) => factorial(+n))
                        .replace(/\^2/g, '**2')
                        .replace(/(\d+)\^(\d+)/g, (_, base, exp) => `Math.pow(${base},${exp})`);

    const result = eval(expression);
    display.value = result;
    document.getElementById("outputBox").innerHTML = `Result: ${result}`;
  } catch (e) {
    display.value = "Error";
    document.getElementById("outputBox").innerHTML = "Error in expression.";
  }
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || "+-*/().".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

function plotGraph(x, y) {
  const ctx = document.getElementById('plotCanvas').getContext('2d');
  if (window.plotInstance) window.plotInstance.destroy();
  window.plotInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: 'Y vs X',
        data: y,
        borderColor: '#00ffc3',
        backgroundColor: 'rgba(0,255,195,0.2)',
        fill: true,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#fff' } }
      },
      scales: {
        x: { ticks: { color: '#fff' } },
        y: { ticks: { color: '#fff' } }
      }
    }
  });
}
function evaluateComplex(expr) {
  expr = expr.replace(/([0-9])i/g, "$1*i"); 
  expr = expr.replace(/i/g, "1i"); 

  const math = {
    add: (a, b) => ({ re: a.re + b.re, im: a.im + b.im }),
    sub: (a, b) => ({ re: a.re - b.re, im: a.im - b.im }),
    mul: (a, b) => ({
      re: a.re * b.re - a.im * b.im,
      im: a.re * b.im + a.im * b.re
    }),
    div: (a, b) => {
      const denom = b.re * b.re + b.im * b.im;
      return {
        re: (a.re * b.re + a.im * b.im) / denom,
        im: (a.im * b.re - a.re * b.im) / denom
      };
    },
    parse: (s) => {
      s = s.replace(/\s+/g, '');
      let match = s.match(/^([+-]?[0-9.]+)([+-][0-9.]+)i$/);
      if (!match) throw new Error("Invalid complex format");
      return { re: parseFloat(match[1]), im: parseFloat(match[2]) };
    }
  };

  const match = expr.match(/(.+)\s*([\+\-\*\/])\s*(.+)/);
  if (!match) throw new Error("Invalid format");
  const [_, left, op, right] = match;
  const a = math.parse(left);
  const b = math.parse(right);
  const result = math[{
    '+': 'add',
    '-': 'sub',
    '*': 'mul',
    '/': 'div'
  }[op]](a, b);

  return `${result.re.toFixed(4)} + ${result.im.toFixed(4)}i`;
}

function solve2x2() {
  const a1 = parseFloat(document.getElementById("a1").value);
  const b1 = parseFloat(document.getElementById("b1").value);
  const c1 = parseFloat(document.getElementById("c1").value);
  const a2 = parseFloat(document.getElementById("a2").value);
  const b2 = parseFloat(document.getElementById("b2").value);
  const c2 = parseFloat(document.getElementById("c2").value);

  const D = a1 * b2 - a2 * b1;
  const Dx = c1 * b2 - c2 * b1;
  const Dy = a1 * c2 - a2 * c1;

  let resultBox = document.getElementById("matrixResult");

  if (D !== 0) {
    const x = Dx / D;
    const y = Dy / D;
    resultBox.innerHTML = `x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`;
  } else {
    resultBox.innerHTML = "No unique solution (Determinant = 0)";
  }
}
function toggleAlphabetPanel() {
  const panel = document.getElementById("alphabetPanel");
  panel.style.display = panel.style.display === "none" ? "block" : "none";
}
