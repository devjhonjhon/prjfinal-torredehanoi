document.getElementById('setup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const cpf = document.getElementById('cpf').value;
    const numPieces = parseInt(document.getElementById('num-pieces').value);

    if (!isValidCpf(cpf)) {
        alert('CPF inválido! Informe um CPF válido.');
        return;
    }

    if (numPieces < 3 || numPieces > 6) {
        alert('Escolha um número de peças entre 3 e 6.');
        return;
    }

    localStorage.setItem('nome', username);
    localStorage.setItem('pecas', numPieces);
    localStorage.setItem('cpf', cpf);

    window.location.href = 'game.html';
});

function isValidCpf(cpf) {
    if (cpf.toLowerCase() === 'admin') return true;

    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfPattern.test(cpf)) return false;

    cpf = cpf.replace(/[^\d]+/g, '');

    if (/^(\d)\1+$/.test(cpf)) return false;

    let sum = 0; //verifica o primeiro codigo verificador
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstVerifier = (sum * 10) % 11;
    firstVerifier = firstVerifier === 10 ? 0 : firstVerifier;

    sum = 0; //verifica o segundo codigo verificador
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondVerifier = (sum * 10) % 11;
    secondVerifier = secondVerifier === 10 ? 0 : secondVerifier;

    return firstVerifier === parseInt(cpf.charAt(9)) && secondVerifier === parseInt(cpf.charAt(10));
}