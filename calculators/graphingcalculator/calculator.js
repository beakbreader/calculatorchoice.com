// Ultimate Graphing Calculator - CalculatorChoice.com

// --- Utility: Parse expressions using safe eval-like logic (math.js alternative, no libraries)
function parseFunction(expr) {
    // Replace ^ with **, handle basic math functions, allow x variable
    let safeExpr = expr
        .replace(/(\d)\s*x/g, '$1*x') // 2x -> 2*x
        .replace(/x(\d)/g, 'x*$1') // x2 -> x*2
        .replace(/\^/g, '**')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/abs\(/g, 'Math.abs(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/exp\(/g, 'Math.exp(');
    // Remove y= or y =
    safeExpr = safeExpr.replace(/y\s*=\s*/g, '');
    try {
        // eslint-disable-next-line no-new-func
        return new Function('x', `return ${safeExpr};`);
    }
