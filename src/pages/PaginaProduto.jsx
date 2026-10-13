import { Link, useParams } from 'react-router'
import { useState } from 'react'

export default function PaginaProduto({ produtos, onAdicionar, onAvisar }) {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === id)
  const [nomeAviso, setNomeAviso] = useState('')
  const [emailAviso, setEmailAviso] = useState('')
  const [mensagemAviso, setMensagemAviso] = useState('')

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  function enviarPedidoAviso(evento) {
    evento.preventDefault()

    const nomeLimpo = nomeAviso.trim()
    const emailLimpo = emailAviso.trim()

    if (!nomeLimpo || !emailLimpo) {
      setMensagemAviso('Preencha nome e e-mail para receber o aviso.')
      return
    }

    onAvisar?.(produto.id, nomeLimpo, emailLimpo)
    setMensagemAviso('Pedido registrado! Avisaremos quando o produto voltar.')
    setNomeAviso('')
    setEmailAviso('')
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">R$ {Number(produto.price).toFixed(2).replace('.', ',')}</p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>

          {produto.estoque > 0 ? (
            <button
              className="botao botao-grande"
              onClick={() => onAdicionar(produto)}
              disabled={produto.estoque === 0}
            >
              Adicionar ao carrinho
            </button>
          ) : (
            <div className="esgotado">
              <p className="aviso aviso-erro">Esgotado</p>

              <form onSubmit={enviarPedidoAviso} className="form-aviso">
                <label>
                  Nome
                  <input
                    value={nomeAviso}
                    onChange={(evento) => setNomeAviso(evento.target.value)}
                    placeholder="Seu nome"
                  />
                </label>

                <label>
                  E-mail
                  <input
                    type="email"
                    value={emailAviso}
                    onChange={(evento) => setEmailAviso(evento.target.value)}
                    placeholder="seu@email.com"
                  />
                </label>

                <button type="submit" className="botao botao-secundario">
                  Me avise quando chegar
                </button>
              </form>

              {mensagemAviso && <p className="mensagem">{mensagemAviso}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}