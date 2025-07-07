    alert("Sistema Criado por:\n\nAironys Garrido");


    function calcular() {
    const inputs = document.querySelectorAll('.input');
    let ganhos = 0;
    let vrva = 0;
    let contas = 0;

    inputs.forEach(input => {
      const valor = parseFloat(input.value) || 0;
      const tipo = input.dataset.type;

      if (tipo === 'rendaFixa' || tipo === 'rendaExtra') ganhos += valor;
      if (tipo === 'vrva') vrva += valor;
      if (['casa', 'condominio', 'iptu', 'luz', 'internet', 'reserva', 'baba'].includes(tipo)) contas += valor;
    });

    const sobrou = ganhos - contas;

    document.getElementById('ganhos').textContent = `R$ ${ganhos.toFixed(2).replace('.', ',')}`;
    document.getElementById('vrva').textContent = `R$ ${vrva.toFixed(2).replace('.', ',')}`;
    document.getElementById('contas').textContent = `R$ ${contas.toFixed(2).replace('.', ',')}`;
    document.getElementById('sobrou').textContent = `R$ ${sobrou.toFixed(2).replace('.', ',')}`;
  }

  document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('input', calcular);
  });

  calcular();
