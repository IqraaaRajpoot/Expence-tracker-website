const balance = document.getElementById('balance');
        const moneyPlus = document.getElementById('money-plus');
        const moneyMinus = document.getElementById('money-minus');
        const list = document.getElementById("list");
        const form = document.getElementById('form');
        const text = document.getElementById('text');
        const amount = document.getElementById('amount');

        let transactions = [];

        function addTransaction() {
            if (text.value.trim() === '' || amount.value.trim() === '') {
                alert('Please enter text and amount');
                return;
            }

            const transaction = {
                id: generateID(),
                text: text.value,
                amount: +amount.value
            };

            transactions.push(transaction);

            addTransactionDOM(transaction);

            updateValues();

            text.value = '';
            amount.value = '';
        }

        function generateID() {
            return Math.floor(Math.random() * 1000000000);
        }

        function addTransactionDOM(transaction) {
            const sign = transaction.amount < 0 ? '-' : '+';

            const item = document.createElement("li");

            item.classList.add(transaction.amount < 0 ? "minus" : "plus");

            item.innerHTML = `
                ${transaction.text} <span>${sign}$${Math.abs(
                transaction.amount
            )}</span>
                <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
            `;

            list.appendChild(item);
        }

        function removeTransaction(id) {
            transactions = transactions.filter(transaction => transaction.id !== id);

            init();
        }

        function updateValues() {
            const amounts = transactions.map(transaction => transaction.amount);

            const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

            const income = amounts
                .filter(item => item > 0)
                .reduce((acc, item) => (acc += item), 0)
                .toFixed(2);

            const expense = (
                amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
                -1
            ).toFixed(2);

            balance.innerText = `$${total}`;
            moneyPlus.innerText = `+$${income}`;
            moneyMinus.innerText = `-$${expense}`;
        }

        function init() {
            list.innerHTML = '';

            transactions.forEach(addTransactionDOM);
            updateValues();
        }

        init();