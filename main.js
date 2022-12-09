window.onload = function () {
    const btns = [
        '(', ')', 'del', 'cle',
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];

    const map = new Map();

    const chenghao = "<span class='icon-chenghao1 iconfont'></span>";
    const chuhao = "<span class='icon-chengbeifen iconfont'></span>";

    const transBtn = function (item) {
        if (item === '/') {
            return chuhao;
        }
        else if (item === '*') {
            return chenghao;
        }
        return item;
    }

    const calcuStack = [];
    const [line1, line2] = document.querySelectorAll('.screen-line');

    const fragment = btns.reduce((fragment, item) => {
        // 创建元素
        const div = document.createElement('div');
        // 设置样式
        div.classList.add('btn-item');
        div.classList.add('cool-dark');
        // 展示按钮内容
        div.innerHTML = transBtn(item);
        // 元素到值映射
        map.set(div, item);
        // 逐个添加按钮
        fragment.appendChild(div);
        // 绑定监听
        return fragment;
    }, document.createDocumentFragment());

    const btnWrap = document.querySelector('.btn-wrapper');
    btnWrap.append(fragment);

    const strategy = {
        'del': () => {
            if (calcuStack[calcuStack.length - 1] === '=') {
                strategy.cle();
                return;
            }
            if (
                /^[0-9\.]*$/.test(calcuStack[calcuStack.length - 1])
            ) {
                line1.innerHTML = line1.innerHTML.slice(0, -1);
                calcuStack[calcuStack.length - 1] = calcuStack[calcuStack.length - 1].slice(0, -1);
                if (calcuStack[calcuStack.length - 1] === '') {
                    line1.innerHTML = line1.innerHTML.slice(0, -1);
                    calcuStack.pop();
                }
            }
            else {
                if (
                    calcuStack[calcuStack.length - 1] === '*'
                ) {
                    line1.innerHTML = line1.innerHTML.slice(0, -chenghao.length - 1);
                    calcuStack.pop();
                }
                else if (
                    calcuStack[calcuStack.length - 1] === '/'
                ) {
                    line1.innerHTML = line1.innerHTML.slice(0, -chuhao.length - 1);
                    calcuStack.pop();
                }
                else {
                    line1.innerHTML = line1.innerHTML.slice(0, -2);
                    calcuStack.pop();
                }
            }

        },
        'cle': () => {
            line1.innerText = '';
            calcuStack.splice(0, calcuStack.length);
        },
        '=': () => {
            if(calcuStack[calcuStack.length - 1] === '=') return;
            line1.innerHTML += ' ' + transBtn('=') + ' ';
            calcuStack.push('=');
            const ans = calculate(calcuStack.slice(0, -1));
            line2.innerHTML = 'Ans = ' + ans;
        },
        'input': (item) => {
            if (calcuStack[calcuStack.length - 1] === '=') {
                strategy.cle();
            }
            if (
                /^[0-9\.]$/.test(item)
                && /^[0-9\.]*$/.test(calcuStack[calcuStack.length - 1])
            ) {
                calcuStack[calcuStack.length - 1] += item;
                line1.innerHTML += transBtn(item);
            }
            else {
                calcuStack.push(item);
                line1.innerHTML += ' ' + transBtn(item);
            }
        }
    }

    const handler = (clickItem) => {
        const strategyFunc = strategy[clickItem];
        if (strategyFunc) {
            strategyFunc();
        }
        else {
            strategy.input(clickItem);
        }
    }

    btnWrap.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) return;
        if (event.target.tagName === 'SPAN') {
            handler(map.get(event.target.parentElement));
            return;
        }
        handler(map.get(event.target));
    });


}