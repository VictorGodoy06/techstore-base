import { normalizarPreco } from './carrinho'

export function formatarPreco(valor) {
  const numero = normalizarPreco(valor)

  if (numero === null) {
    return 'Preço indisponível'
  }

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
