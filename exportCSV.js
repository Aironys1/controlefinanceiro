function exportarCSV() {
  const inputs = document.querySelectorAll('.input');
  const linhas = dados.map(linha =>
  linha.join(';')
).join('\n');


  inputs.forEach(input => {
    const label = input.previousElementSibling?.innerText?.trim() || 'Sem label';
    const valor = input.value ? parseFloat(input.value).toFixed(2).replace('.', ',') : '0,00';
    dados.push([label, `R$ ${valor}`]);
  });

  // Adiciona os resultados finais
  dados.push(['GANHOS', document.getElementById('ganhos').textContent]);
  dados.push(['CONTAS', document.getElementById('contas').textContent]);
  dados.push(['SOBROU', document.getElementById('sobrou').textContent]);
  dados.push(['VR/VA', document.getElementById('vrva').textContent]);

  const linhas = dados.map(linha =>
  linha.map(campo => `"${campo}"`).join(',')
).join('\n');
  const blob = new Blob(["\uFEFF" + linhas], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'controle-financeiro.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Adiciona evento ao botão após o DOM carregar
document.addEventListener('DOMContentLoaded', function () {
  const botaoExportar = document.getElementById('exportCSV');
  if (botaoExportar) {
    botaoExportar.addEventListener('click', exportarCSV);
  }
});




if (typeof gtag === 'function') {
  gtag('event', 'exportar_csv', {
    event_category: 'interacao',
    event_label: 'Clique no botão Exportar CSV'
  });
}



document.querySelectorAll('.input').forEach(input => {
  input.addEventListener('input', event => {
    calcular();

    if (typeof gtag === 'function') {
      const tipoCampo = event.target.dataset.type || 'desconhecido';
      const nomeEvento = `digitou_${tipoCampo}`;

      gtag('event', nomeEvento, {
        campo: tipoCampo,
        valor: event.target.value || '0'
      });
    }
  });
});
