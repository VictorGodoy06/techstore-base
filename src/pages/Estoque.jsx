export default function Estoque({ produtos = [], espera = [] }) {
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)
  const esperaPorProduto = espera.reduce((acumulador, item) => {
    ; (acumulador[item.produtoId] ||= []).push(item)
    return acumulador
  }, {})

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Lista de espera</h2>
      <div className="lista-espera">
        {produtos.map((produto) => {
          const pedidos = esperaPorProduto[produto.id] || []

          if (pedidos.length === 0) return null

          return (
            <div key={produto.id} className="bloco-espera">
              <h3>{produto.title}</h3>
              <ul>
                {pedidos.map((pedido, index) => (
                  <li key={`${produto.id}-${index}`}>
                    {pedido.nome} — {pedido.email}
                    <small> ({new Date(pedido.criadoEm).toLocaleString('pt-BR')})</small>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}