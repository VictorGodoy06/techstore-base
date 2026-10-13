// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

export function normalizarPreco(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return null
  }

  const texto = String(valor).trim()
  if (!texto) {
    return null
  }

  const numero = Number(
    texto.replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '')
  )

  return Number.isFinite(numero) ? numero : null
}

export function produtoTemPrecoValido(produto) {
  return Boolean(produto) && normalizarPreco(produto.price) !== null
}

export function calcularTotal(carrinho) {
  const total = carrinho.reduce((soma, produto) => {
    const preco = normalizarPreco(produto?.price)
    return soma + (preco ?? 0)
  }, 0)

  return Math.round(total * 100) / 100
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho.forEach((produto) => {
    if (!produto || produto.id == null) return

    const existente = itens.find((item) => item.produto.id === produto.id)
    if (existente) {
      existente.quantidade += 1
    } else {
      itens.push({ produto, quantidade: 1 })
    }
  })
  return itens
}