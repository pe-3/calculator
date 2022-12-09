const evalRPN = function (tokens) {
    if (!tokens.length) return 0;
    const stack = [];

    const stragery = {
        '+': (num2, num1) => num1 + num2,
        '-': (num2, num1) => num1 - num2,
        '*': (num2, num1) => num1 * num2,
        '/': (num2, num1) => parseInt(num1 / num2)
    };

    tokens.forEach(
        item => {
            if (stragery[item]) {
                stack.push(stragery[item](stack.pop(), stack.pop()));
            }
            else {
                stack.push(parseFloat(item))
            }
        }
    );

    return stack.pop();
};

const calculate = function (express) {
    eval(`console.log(${express.join('')})`);
    const s1 = [];
    const s2 = [];
    const stragery = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1
    };

    express.forEach(item => {
        const priority = stragery[item];
        if (priority !== undefined) {
            let prePriority = stragery[s1[s1.length - 1]] ?? 0;
            if (priority > prePriority) {
                s1.push(item);
            }
            else {
                while (priority <= prePriority && s1.length) {
                    s2.push(s1.pop());
                    prePriority = stragery[s1[s1.length - 1]] ?? 0;
                }
                s1.push(item);
            }
        }
        else {
            if (item === '(') {
                s1.push(item);
            }
            else if (item === ')') {
                while (s1[s1.length - 1] !== '(') {
                    s2.push(s1.pop());
                }
                s1.pop();
            }
            else {
                s2.push(item);
            }
        }
    });

    while (s1.length) {
        s2.push(s1.pop());
    }

    const tokens = s2;
    console.log(tokens);
    return evalRPN(tokens);
}

// const ans = calculate(['(', '2', '+', '1', ')', '*', '3']);
// console.log(ans);
// calculate(['4', '+', '(', '13', '/', '5', ')']);



// const res = evalRPN(["4", "13", "5", "/", "+"]);
// console.log(res);