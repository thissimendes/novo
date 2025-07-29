// Funções e interações com Firestore
function abrirCadastroCompleto() {
  document.getElementById("formularioCompleto").classList.remove("hidden");
  document.getElementById("listaEventos").classList.add("hidden");
  document.getElementById("buscaCliente").classList.add("hidden");
}

function visualizarEventosAgendados() {
  document.getElementById("formularioCompleto").classList.add("hidden");
  document.getElementById("listaEventos").classList.remove("hidden");
  document.getElementById("buscaCliente").classList.add("hidden");
  carregarEventos();
}

function abrirBuscaCliente() {
  document.getElementById("formularioCompleto").classList.add("hidden");
  document.getElementById("listaEventos").classList.add("hidden");
  document.getElementById("buscaCliente").classList.remove("hidden");
}

document.getElementById("formCadastroCompleto").addEventListener("submit", function (e) {
  e.preventDefault();
  const cliente = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    insta: document.getElementById("insta").value,
    endereco: document.getElementById("endereco").value,
    cpf: document.getElementById("cpf").value,
    tipoEvento: document.getElementById("tipo").value,
    dataEvento: document.getElementById("dataEvento").value,
    valorTotal: parseFloat(document.getElementById("valorTotal").value),
    valorPago: parseFloat(document.getElementById("valorPago").value),
    timestamp: Date.now()
  };

  db.collection("clientes").add(cliente).then(() => {
    alert("Cadastro salvo com sucesso!");
    document.getElementById("formCadastroCompleto").reset();
  });
});

function carregarEventos() {
  db.collection("clientes").orderBy("dataEvento").get().then(snapshot => {
    const lista = document.getElementById("eventosFiltrados");
    lista.innerHTML = "";
    snapshot.forEach(doc => {
      const d = doc.data();
      const li = document.createElement("li");
      li.textContent = `${d.nome} - ${d.tipoEvento} - ${d.dataEvento}`;
      lista.appendChild(li);
    });
  });
}

function filtrarEventosPorData() {
  const dataFiltro = document.getElementById("filtroData").value;
  db.collection("clientes").where("dataEvento", "==", dataFiltro).get().then(snapshot => {
    const lista = document.getElementById("eventosFiltrados");
    lista.innerHTML = "";
    snapshot.forEach(doc => {
      const d = doc.data();
      const li = document.createElement("li");
      li.textContent = `${d.nome} - ${d.tipoEvento} - ${d.dataEvento}`;
      lista.appendChild(li);
    });
  });
}

function buscarClientePorNome() {
  const nomeBusca = document.getElementById("nomeBusca").value.trim().toLowerCase();
  db.collection("clientes").get().then(snapshot => {
    const resultado = document.getElementById("resultadoBusca");
    resultado.innerHTML = "";
    snapshot.forEach(doc => {
      const d = doc.data();
      if (d.nome.toLowerCase().includes(nomeBusca)) {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${d.nome}</strong><br>Telefone: ${d.telefone}<br>Instagram: ${d.insta}<br>Endereço: ${d.endereco}<br>CPF: ${d.cpf}<br>Evento: ${d.tipoEvento} - ${d.dataEvento}<br>Valor Total: R$${d.valorTotal} | Valor Pago: R$${d.valorPago}<hr>`;
        resultado.appendChild(div);
      }
    });
  });
}