import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import RolarParaTopo from './components/RolarParaTopo'
import Loja from './pages/Loja'
import PaginaProduto from './pages/PaginaProduto'
import Carrinho from './pages/Carrinho'
import Estoque from './pages/Estoque'
import { buscarProdutos } from './services/produtos'
import { buscarClientes } from './services/clientes'

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [carrinho, setCarrinho] = useState([])
  const [clientes, setClientes] = useState([])
  const [clienteAtualId, setClienteAtualId] = useState(null)
  const [espera, setEspera] = useState([])

  useEffect(() => {
    buscarProdutos()
      .then((dados) => setProdutos(dados))
      .catch(() => setErro('Não foi possível carregar os produtos.'))
      .finally(() => setCarregando(false))

    buscarClientes().then((dados) => {
      setClientes(dados)
      if (dados.length > 0) setClienteAtualId(dados[0].id)
    })
  }, [])

  function adicionarAoCarrinho(produto) {
    const preco = Number(produto.price)

    if (!produto.price || Number.isNaN(preco)) {
      alert('Este produto ainda não tem preço definido e não pode ser adicionado ao carrinho.')
      return
    }

    if (Number(produto.estoque) <= 0) {
      alert('Produto esgotado e não pode ser adicionado ao carrinho.')
      return
    }

    setCarrinho((atual) => atual.concat(produto))
  }

  function solicitarAviso(produtoId, nome, email) {
    const nomeLimpo = nome.trim()
    const emailLimpo = email.trim()

    if (!nomeLimpo || !emailLimpo) return

    setEspera((atual) =>
      atual.concat({
        produtoId,
        nome: nomeLimpo,
        email: emailLimpo,
        criadoEm: new Date().toISOString(),
      })
    )
  }

  function removerUmaUnidade(produtoId) {
    setCarrinho((atual) => {
      let removido = false
      return atual.filter((produto) => {
        if (!removido && produto.id === produtoId) {
          removido = true
          return false
        }
        return true
      })
    })
  }

  const clienteAtual = clientes.find((cliente) => cliente.id === clienteAtualId)

  return (
    <div className="app">
      <RolarParaTopo />
      <Header carrinho={carrinho} clienteAtual={clienteAtual} />

      <main className="conteudo">
        {carregando && <p className="aviso">Carregando produtos...</p>}
        {erro && <p className="aviso aviso-erro">{erro}</p>}

        {!carregando && !erro && (
          <Routes>
            <Route path="/" element={<Loja produtos={produtos} onAdicionar={adicionarAoCarrinho} />} />

            <Route
              path="/produto/:id"
              element={
                <PaginaProduto
                  produtos={produtos}
                  onAdicionar={adicionarAoCarrinho}
                  onAvisar={solicitarAviso}
                />
              }
            />

            <Route
              path="/carrinho"
              element={
                <Carrinho
                  carrinho={carrinho}
                  produtos={produtos}
                  clienteAtual={clienteAtual}
                  onAdicionar={adicionarAoCarrinho}
                  onRemover={removerUmaUnidade}
                />
              }
            />

            <Route path="/estoque" element={<Estoque produtos={produtos} espera={espera} />} />
          </Routes>
        )}
      </main>

      <Footer
        clientes={clientes}
        clienteAtualId={clienteAtualId}
        onTrocarCliente={setClienteAtualId}
      />
    </div>
  )
}
